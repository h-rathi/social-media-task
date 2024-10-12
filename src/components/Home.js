// src/components/Home.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div>
      <h2>Welcome</h2>
      <button onClick={() => navigate('/submit')}>Go to User Form</button>
      <button onClick={() => navigate('/admin')}>Go to Admin Dashboard</button>
    </div>
  );
}

export default Home;
