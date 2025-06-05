import express, {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import dotenv from 'dotenv';
// @ts-ignore
import {validationResult, checkSchema} from 'express-validator';

dotenv.config();
const router = express.Router();

const registerValidation = checkSchema({
  email: {
    in: ['body'],
    isEmail: {
      errorMessage: 'Invalid email',
    },
  },
  password: {
    in: ['body'],
    isLength: {
      options: { min: 6 },
      errorMessage: 'Password must be at least 6 characters',
    },
  },
});


// POST /api/auth/register
router.post(
  '/register', registerValidation, async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ errors: errors.toString });

    const { email, password } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) return res.status(400).json({ msg: 'User already exists' });

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = new User({ email, password: hashedPassword });
      await user.save();

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

// POST /api/auth/login
router.post(
  '/login', registerValidation, async (req: Request, res: Response): Promise<any> => {
    const errors = validationResult(req);
    if (!errors.isEmpty) return res.status(400).json({ errors: errors.toString });

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });

      return res.json({ token, user: { id: user._id, email: user.email } });
    } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
    }
  }
);

export default router;
