import React, { useEffect, useState } from 'react';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null); // State for error handling

  // Fetch user data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://social-media-backend-n1tsxd1vp-himanshu-rathis-projects.vercel.app/users'); // Actual API call to fetch user data
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError(error.message); // Set error message if the fetch fails
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2 style={{ fontSize: '24px' }}>Users Info</h2>
      {error && <p style={{ color: 'red', fontSize: '20px' }}>{error}</p>} {/* Display error message if any */}
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <p style={{ fontSize: '20px' }}>Name: {user.name}</p>
            <p style={{ fontSize: '20px' }}>Social Media Handle: {user.socialHandle}</p>
            <div>
              {user.images.length > 0 ? ( // Check if there are images to display
                user.images.map((image, i) => (
                  <img
                    key={i}
                    src={`http://localhost:5000/${image.replace(/\\/g, '/')}`} // Replace backslashes with forward slashes
                    alt={`uploaded ${i}`}
                    width="400px" // Increase the width of the images
                  />
                ))
              ) : (
                <p style={{ fontSize: '18px' }}>No images uploaded</p> // Message if no images are uploaded
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminDashboard;
