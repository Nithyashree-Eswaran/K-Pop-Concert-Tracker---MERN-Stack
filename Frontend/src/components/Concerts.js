import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './Concerts.css';

function Concerts() {
  const [concerts, setConcerts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredConcerts, setFilteredConcerts] = useState([]);
  const location = useLocation();

  const groupImages = {
    'BTS': 'http://localhost:5002/images/groups/BTS.jpg',
    'BLACKPINK': 'http://localhost:5002/images/groups/Blackpink.jpg',
    'Blackpink': 'http://localhost:5002/images/groups/Blackpink.jpg',
    'EXO': 'http://localhost:5002/images/groups/EXO.jpg',
    'TWICE': 'http://localhost:5002/images/groups/Twice.jpg',
    'Twice': 'http://localhost:5002/images/groups/Twice.jpg',
    'Red Velvet': 'http://localhost:5002/images/groups/RedVelvet.jpg',
    'RED VELVET': 'http://localhost:5002/images/groups/RedVelvet.jpg',
    'NCT 127': 'http://localhost:5002/images/groups/NCT127.jpg',
    'NCT127': 'http://localhost:5002/images/groups/NCT127.jpg',
    'NCT Dream': 'http://localhost:5002/images/groups/NCTdream.jpg',
    'NCT DREAM': 'http://localhost:5002/images/groups/NCTdream.jpg',
    'SEVENTEEN': 'http://localhost:5002/images/groups/Seventeen.jpg',
    'Seventeen': 'http://localhost:5002/images/groups/Seventeen.jpg',
    'Stray Kids': 'http://localhost:5002/images/groups/StrayKids.jpg',
    'STRAY KIDS': 'http://localhost:5002/images/groups/StrayKids.jpg',
    'TXT': 'http://localhost:5002/images/groups/TXT.jpg',
    'TOMORROW X TOGETHER': 'http://localhost:5002/images/groups/TXT.jpg',
    'ITZY': 'http://localhost:5002/images/groups/ITZY.jpg',
    'ATEEZ': 'http://localhost:5002/images/groups/Ateez.jpg',
    'Ateez': 'http://localhost:5002/images/groups/Ateez.jpg',
    'IU': 'http://localhost:5002/images/groups/IU.jpg',
    'MAMAMOO': 'http://localhost:5002/images/groups/Mamamoo.jpg',
    'Mamamoo': 'http://localhost:5002/images/groups/Mamamoo.jpg',
    'ENHYPEN': 'http://localhost:5002/images/groups/Enhypen.jpg',
    'Enhypen': 'http://localhost:5002/images/groups/Enhypen.jpg',
    'LE SSERAFIM': 'http://localhost:5002/images/groups/LeSserafim.jpg',
    'Le Sserafim': 'http://localhost:5002/images/groups/LeSserafim.jpg',
    'NewJeans': 'http://localhost:5002/images/groups/NewJeans.jpg',
    'NEWJEANS': 'http://localhost:5002/images/groups/NewJeans.jpg',
    'aespa': 'http://localhost:5002/images/groups/Aespa.jpg',
    'AESPA': 'http://localhost:5002/images/groups/Aespa.jpg',
    '(G)I-DLE': 'http://localhost:5002/images/groups/GIDLE.jpg',
    'G-IDLE': 'http://localhost:5002/images/groups/GIDLE.jpg',
    'GIDLE': 'http://localhost:5002/images/groups/GIDLE.jpg',
    'BOYNEXTDOOR': 'http://localhost:5002/images/groups/BoyNextDoor.jpg',
    'BoyNextDoor': 'http://localhost:5002/images/groups/BoyNextDoor.jpg',
    'Boy Next Door': 'http://localhost:5002/images/groups/BoyNextDoor.jpg'
  };

  const getGroupImage = (groupName) => {
   
    if (groupImages[groupName]) {
      return groupImages[groupName];
    }
    

    if (groupImages[groupName.toUpperCase()]) {
      return groupImages[groupName.toUpperCase()];
    }
    
 
    if (groupImages[groupName.toLowerCase()]) {
      return groupImages[groupName.toLowerCase()];
    }
    
 
    const firstWord = groupName.split(' ')[0];
    for (let key in groupImages) {
      if (key.startsWith(firstWord)) {
        return groupImages[key];
      }
    }
    
    
    return 'http://localhost:5002/images/concerts/bg.jpg';
  };

  useEffect(() => {
   
    const params = new URLSearchParams(location.search);
    const groupFilter = params.get('group');
    
    
    axios.get('http://localhost:5002/api/v1/k-pop_concerts')
      .then(response => {
        let concertList = response.data;
        if (groupFilter) {
          concertList = concertList.filter(concert => 
            concert.groupName.toLowerCase() === groupFilter.toLowerCase()
          );
          setSearchTerm(groupFilter);
        }
        setConcerts(concertList);
        setFilteredConcerts(concertList);
      })
      .catch(error => console.error('Error fetching concerts:', error));

  }, [location]);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = concerts.filter(concert => 
      concert.name.toLowerCase().includes(term) ||
      concert.groupName.toLowerCase().includes(term) ||
      concert.location.toLowerCase().includes(term)
    );
    setFilteredConcerts(filtered);
  };

  return (
    <div className="concerts-page">
      <div className="concerts-header">
        <h1>Upcoming K-Pop Concerts</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search concerts by name, group, or location..."
            value={searchTerm}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="concerts-grid">
        {filteredConcerts.map(concert => (
          <div key={concert._id} className="concert-card">
            <div className="concert-image">
              <img 
                src={getGroupImage(concert.groupName)} 
                alt={concert.groupName} 
              />
            </div>
            <div className="concert-details">
              <h2>{concert.name}</h2>
              <div className="concert-info">
                <p className="group-name">{concert.groupName}</p>
                <p className="date-time">
                  {new Date(concert.date).toLocaleDateString()} at {concert.time}
                </p>
                <p className="location">{concert.location}</p>
                <p className="duration">
                  {concert.numOfDays > 1 ? `${concert.numOfDays} Days Event` : '1 Day Event'}
                </p>
              </div>
              {concert.ticketLink && (
                <a 
                  href={concert.ticketLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="buy-tickets-btn"
                >
                  Buy Tickets
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Concerts;
