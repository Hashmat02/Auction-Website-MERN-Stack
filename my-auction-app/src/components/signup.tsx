import React, { useState } from 'react';
import '../css/signup.css';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({ username: '', password: '', confirmPassword: '' });
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username: formData.username, password: formData.password })
            });
            if (!response.ok) {
                const data = await response.json();
                if (response.status === 409 && data.message) {
                    // Username already exists
                    setError(data.message);
                    // setError('Username already exists')
                } else {
                    // Other error occurred
                    setError('Failed to create account, Username already exists');
                }
                return;
            }
            alert('Account created successfully');
            navigate('/login');
        } catch (error) {
            console.error('Signup failed:', error);
            setError('An error occurred while creating the account');
        }
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleInputChange} />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleInputChange} />
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleInputChange} />
                <button type="submit">Create Account</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );
};

export default Signup;
