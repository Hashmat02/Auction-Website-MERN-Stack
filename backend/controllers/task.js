import {Task } from '../models/task.js';

export const createTask = async (req, res, next) => {
    try {
        const { title, description, userId } = req.body;
        if (!title || !description || !userId) 
        {
            return res.status(400).send('Please provide all the required fields');
        }
        const task = await Task.create({title, description, createdBy: userId});
        return res.status(201).json(task);

    } catch (error) 
    {
        return res.status(500).send('Error creating task');
    }
}