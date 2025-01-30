const mongoose = require("mongoose");

const concertSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  groupName: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  imagePath: {
    type: String,
    default: 'concerts/default-concert.jpg'
  },
  ticketLink: {
    type: String,
    required: true,
  },
  numOfDays: {
    type: Number,
    min: [1, "Number of days must be at least 1"],
    default: 1
  },
  coordinates: {
    lat: {
      type: Number,
      min: -90,
      max: 90
    },
    lng: {
      type: Number,
      min: -180,
      max: 180
    }
  }
}, {
  timestamps: true
});

module.exports = mongoose.model("Concert", concertSchema);
