import mongoose from "mongoose"

export type TaskStatus = 'To do' | 'In progress' | 'Done';

export interface Task {
  _id: string;
  title: string;
  description: string;
  status: TaskStatus;
  userId: mongoose.Types.ObjectId
}
