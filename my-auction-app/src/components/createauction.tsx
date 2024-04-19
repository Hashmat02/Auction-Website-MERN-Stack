
import '../css/createauction.css';
import React, { useState } from 'react';

const CreateAuction = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startingPrice: '',
        startTime: '',
        endTime: '',
        image: '',
        creatorUsername: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const creatorUsername = localStorage.getItem('username'); // Retrieve username from local storage
        console.log('Creator username:', creatorUsername);

        if (!creatorUsername) {
            alert('You must be logged in to create an auction.');
            return;
        }
        // Ensure formData includes the creatorUsername
        const completeFormData = {
            ...formData,
            creatorUsername,
        };

        try {
            const response = await fetch('http://localhost:8080/api/auctions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(completeFormData) // Directly spread completeFormData here
            });
            
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Failed to create auction');
            }
            alert('Auction created successfully!');
            console.log(data);
        } catch (error) {
            console.error('Error creating auction:', error);
            if (error instanceof Error) {
                alert('Failed to create auction: ' + error.message);
            } else {
                alert('Failed to create auction');
            }
        }
    };


    return (
        <div>
            <h1>Create Auction</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange} required />
                </label>
                <label>
                    Starting Price:
                    <input type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange} required />
                </label>

                <label>
                    Starting Time:
                    <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} required />
                </label>
                <label>
                    Ending Time:
                    <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} required />
                </label>
                <label>
                    Image URL:
                    <input type="text" name="image" value={formData.image} onChange={handleChange} />
                </label>
                <button type="submit">Create Auction</button>
            </form>
        </div>
    );
};

export default CreateAuction;


