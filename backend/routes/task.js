import express from 'express';
import { createTask} from '../controllers/task.js';

// Correctly define the router for tasks
const taskRouter = express.Router();

// Use 'taskRouter' instead of 'userRouter'
taskRouter.post('/create', createTask);

export { taskRouter };
