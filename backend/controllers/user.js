// src/controllers/userController.js
import User from '../models/user.js';
import bcrypt from 'bcryptjs';

export const registerUser = async (req, res) => {
    // Inside your registerUser function in userController.js
   console.log("Received signup request");

    try {
        const { username, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).send("User created successfully");
    } catch (error) {
        console.error("Error in registerUser:", error);
        res.status(500).json({ message: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (user && await bcrypt.compare(password, user.password)) {
            res.json({ message: 'Login successful' });
        } else {
            res.status(401).json({ message: 'Invalid Username or Password' });
        }
    } catch (error) {
        console.error("Error in loginUser:", error);
        res.status(500).json({ message: error.message });
    }
};

// export const getUserProfile = async (req, res) => {
//     const { username } = req.params;
//     try {
//         const user = await User.findOne({ username: username });
//         if (!user) {
//             return res.status(404).send('User not found');
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: error.message });
//     }
// };

export const getUserProfile = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username }).populate('createdAuctions');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user profile", error: error.message });
    }
};

export const getCurrentUser = (req, res) => {
    // Assuming the username is included in the request object after authentication
    const { username } = req.user;
    res.json({ username });
};

export const changePassword = async (req, res) => {
    const { username, oldPassword, newPassword } = req.body; // Changed from userId to username

    try {
        // Find the user by their username
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Incorrect old password" });
        }
        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Password successfully updated" });
    } catch (error) {
        res.status(500).json({ message: "Error changing password", error: error.message });
    }
};

