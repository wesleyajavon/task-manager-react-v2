// src/routes/tasks.ts
import express, { Response } from 'express';
import Task from '../models/Task';
import { authMiddleware, AuthRequest } from '../middleware/auth';


const router = express.Router();

router.get('/', authMiddleware, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.post('/', authMiddleware , async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { title, description , status } = req.body;
    const newTask = await Task.create({
      title,
      description,
      status,
      userId: req.userId,
    });
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const { title, status, description } = req.body;
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, status, description },
      { new: true }
    );
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

router.delete('/:id', authMiddleware, async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!task) return res.status(404).json({ msg: 'Task not found' });
    res.json({ msg: 'Task deleted' });
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
