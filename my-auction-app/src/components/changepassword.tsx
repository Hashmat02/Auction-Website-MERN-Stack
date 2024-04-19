import React, { useState } from 'react';
import '../css/changepassword.css'; // Make sure the CSS path is correct

interface PasswordFields {
    oldPassword: string;
    newPassword: string;
    confirmNewPassword: string;
}

const ChangePassword: React.FC = () => {
    const [passwords, setPasswords] = useState<PasswordFields>({
        oldPassword: '',
        newPassword: '',
        confirmNewPassword: ''
    });
    const [error, setError] = useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswords({
            ...passwords,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const username = localStorage.getItem('username'); // Get the username from local storage

        if (!username) {
            setError('Username is not available.');
            return;
        }

        // Check if the new passwords match
        if (passwords.newPassword !== passwords.confirmNewPassword) {
            setError('New passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/users/change-password', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, oldPassword: passwords.oldPassword, newPassword: passwords.newPassword })
            });

            const data = await response.json();
            if (response.ok) {
                alert('Password successfully changed!');
                // navigate or do additional things here
                setError(''); // Clear any errors if the update is successful
            } else {
                throw new Error(data.message || 'Failed to change password');
            }
        } catch (error) {
            const errorMessage = (error as Error).message; // Asserting that error is an instance of Error
            setError(errorMessage); // Update the error state with the error message
        }
    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="oldPassword">Old Password:</label>
                    <input
                        type="password"
                        id="oldPassword"
                        name="oldPassword"
                        value={passwords.oldPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={passwords.newPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmNewPassword">Confirm New Password:</label>
                    <input
                        type="password"
                        id="confirmNewPassword"
                        name="confirmNewPassword"
                        value={passwords.confirmNewPassword}
                        onChange={handleChange}
                        required
                    />
                </div>
                {error && <div className="error">{error}</div>}
                <button type="submit">Change Password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
