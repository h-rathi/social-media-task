import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserForm = () => {
    const [name, setName] = useState('');
    const [handle, setHandle] = useState('');
    const [images, setImages] = useState([]);
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate(); // Initialize the useNavigate hook

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Reset error message
        setError('');

        // Validate form fields
        if (!name || !handle || images.length === 0) {
            setError('Please fill out all fields and upload at least one image.');
            return; // Prevent form submission if validation fails
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('socialHandle', handle);
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        try {
            const response = await fetch('https://social-media-backend-n1tsxd1vp-himanshu-rathis-projects.vercel.app/submit', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Submission successful:', result);
                // Navigate to the success page
                navigate('/Success');
            } else {
                console.error('Submission failed:', response.statusText);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="container">
            <h2>User Submission Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input 
                        type="text" 
                        value={name} 
                        onChange={(e) => setName(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Social Media Handle:</label>
                    <input 
                        type="text" 
                        value={handle} 
                        onChange={(e) => setHandle(e.target.value)} 
                    />
                </div>
                <div>
                    <label>Upload Images:</label>
                    <input 
                        type="file" 
                        multiple 
                        onChange={handleImageChange} 
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message */}
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default UserForm;
