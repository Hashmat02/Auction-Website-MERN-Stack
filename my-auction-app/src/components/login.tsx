import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../css/login.module.css';

interface LoginProps {
    onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');  // State to store the error message
    const navigate = useNavigate();

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log('Login Attempt:', username, password);

        try {
            const response = await fetch('http://localhost:8080/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                console.log('Login Successful:', data);
                localStorage.setItem('username', username); // Store the username in local storage
                onLoginSuccess();
                navigate('/home');
            } else {
                throw new Error(data.message || 'Invalid username or password');
            }
        } catch (error) {
            const errorMessage = (error as Error).message; // Asserting that error is an instance of Error
            console.error('Login failed:', errorMessage);
            setError(errorMessage);  // Update the error state with the error message
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginForm}>
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="username">Username</label>
                        <input type="text" id="username" value={username} onChange={handleUsernameChange} />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" value={password} onChange={handlePasswordChange} />
                    </div>
                    {error && <div className={styles.error}>{error}</div>}  {/* Display the error message if there is one */}
                    <button type="submit">Log In</button>
                </form>
                <div className={styles.signupLink}>
                    Don't have an account? <a href="/signup">Sign Up</a>
                </div>
            </div>
        </div>
    );
};

export default Login;
