import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token');

  const handleGroupClick = (groupName) => {
    if (!isLoggedIn) {
      
      navigate('/login', { state: { redirectTo: `/concerts?group=${encodeURIComponent(groupName)}` } });
    } else {
      navigate(`/concerts?group=${encodeURIComponent(groupName)}`);
    }
  };

  const groups = [
    { id: 1, name: 'BTS', imageUrl: 'http://localhost:5002/images/groups/BTS.jpg' },
    { id: 2, name: 'Blackpink', imageUrl: 'http://localhost:5002/images/groups/Blackpink.jpg' },
    { id: 3, name: 'EXO', imageUrl: 'http://localhost:5002/images/groups/EXO.jpg' },
    { id: 4, name: 'Twice', imageUrl: 'http://localhost:5002/images/groups/Twice.jpg' },
    { id: 5, name: 'Red Velvet', imageUrl: 'http://localhost:5002/images/groups/RedVelvet.jpg' },
    { id: 6, name: 'NCT 127', imageUrl: 'http://localhost:5002/images/groups/NCT127.jpg' },
    { id: 7, name: 'NCT Dream', imageUrl: 'http://localhost:5002/images/groups/NCTdream.jpg' },
    { id: 8, name: 'Seventeen', imageUrl: 'http://localhost:5002/images/groups/Seventeen.jpg' },
    { id: 9, name: 'Stray Kids', imageUrl: 'http://localhost:5002/images/groups/StrayKids.jpg' },
    { id: 10, name: 'TXT', imageUrl: 'http://localhost:5002/images/groups/TXT.jpg' },
    { id: 11, name: 'ITZY', imageUrl: 'http://localhost:5002/images/groups/ITZY.jpg' },
    { id: 12, name: 'Ateez', imageUrl: 'http://localhost:5002/images/groups/Ateez.jpg' },
    { id: 13, name: 'IU', imageUrl: 'http://localhost:5002/images/groups/IU.jpg' },
    { id: 14, name: 'Mamamoo', imageUrl: 'http://localhost:5002/images/groups/Mamamoo.jpg' },
    { id: 15, name: 'BOYNEXTDOOR', imageUrl: 'http://localhost:5002/images/groups/BoyNextDoor.jpg' }
  ];

  const filteredGroups = groups.filter(group =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home">
      <div className="hero-section">
        <h1>K-Pop Concert Tracker</h1>
        <p>Find and track your favorite K-pop concerts</p>
      </div>

      <div className="search-section">
        <input
          type="text"
          placeholder="Search K-pop groups..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="groups-grid">
        {filteredGroups.map(group => (
          <div key={group.id} className="group-card" onClick={() => handleGroupClick(group.name)}>
            <div className="group-image">
              <img src={group.imageUrl} alt={group.name} />
            </div>
            <div className="group-info">
              <h3>{group.name}</h3>
              <p className="login-prompt">
                {!isLoggedIn && "Login to view concerts"}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
