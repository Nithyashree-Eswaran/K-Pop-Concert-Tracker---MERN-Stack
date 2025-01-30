const express = require("express");
const router = express.Router();
const Concert = require("../models/Concert");

// Get all concerts
router.get("/", async (req, res) => {
  try {
    const concerts = await Concert.find();
    // Add full image URL to each concert
    const concertsWithImageUrls = concerts.map(concert => {
      const concertObj = concert.toObject();
      concertObj.imageUrl = `http://localhost:${process.env.PORT || 5002}/images/${concert.imagePath}`;
      return concertObj;
    });
    res.json(concertsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new concert
router.post("/", async (req, res) => {
  try {
    const { name, groupName, date, time, location, imagePath, ticketLink } = req.body;
    
    if (!name || !groupName || !date || !time || !location || !ticketLink) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const concert = new Concert({
      name,
      groupName,
      date,
      time,
      location,
      imagePath: imagePath || 'concerts/default-concert.jpg',
      ticketLink
    });

    const newConcert = await concert.save();
    // Add full image URL to response
    const concertObj = newConcert.toObject();
    concertObj.imageUrl = `http://localhost:${process.env.PORT || 5002}/images/${concert.imagePath}`;
    res.status(201).json(concertObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific concert
router.get("/:id", async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }
    // Add full image URL to response
    const concertObj = concert.toObject();
    concertObj.imageUrl = `http://localhost:${process.env.PORT || 5002}/images/${concert.imagePath}`;
    res.json(concertObj);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a concert
router.put("/:id", async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }

    const updates = req.body;
    Object.keys(updates).forEach((key) => {
      if (key !== '_id') {
        concert[key] = updates[key];
      }
    });

    const updatedConcert = await concert.save();
    // Add full image URL to response
    const concertObj = updatedConcert.toObject();
    concertObj.imageUrl = `http://localhost:${process.env.PORT || 5002}/images/${concert.imagePath}`;
    res.json(concertObj);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a concert
router.delete("/:id", async (req, res) => {
  try {
    const concert = await Concert.findById(req.params.id);
    if (!concert) {
      return res.status(404).json({ message: "Concert not found" });
    }
    await concert.remove();
    res.json({ message: "Concert deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Search concerts based on keywords (name, group name, or location)
router.get("/search", async (req, res) => {
  const { keyword } = req.query;
  
  if (!keyword) {
    return res.status(400).json({ message: "Please provide a search keyword" });
  }

  try {
    const concerts = await Concert.find({
      $or: [
        { name: { $regex: keyword, $options: 'i' } },
        { groupName: { $regex: keyword, $options: 'i' } },
        { location: { $regex: keyword, $options: 'i' } }
      ]
    });
    // Add full image URL to each concert
    const concertsWithImageUrls = concerts.map(concert => {
      const concertObj = concert.toObject();
      concertObj.imageUrl = `http://localhost:${process.env.PORT || 5002}/images/${concert.imagePath}`;
      return concertObj;
    });
    res.json(concertsWithImageUrls);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
