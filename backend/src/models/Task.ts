// src/models/Task.ts
import mongoose, {Document, Schema} from 'mongoose';
import { Task  } from '../../../task-manager/src/types/Task';

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: {
    type: String,
    enum: ['To do', 'In progress', 'Done'],
    default: 'To do',
  },
  userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
}, { timestamps: true }); // Optional: adds createdAt and updatedAt

export default mongoose.model('Task', taskSchema);
