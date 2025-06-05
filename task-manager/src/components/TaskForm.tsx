// components/TaskForm.tsx
// components/TaskForm.tsx
import type { TaskStatus } from "../types/Task";

interface Props {
  newTask: string;
  newDescription: string;
  status: TaskStatus;
  setNewTask: (val: string) => void;
  setNewDescription: (val: string) => void;
  setStatus: (val: TaskStatus) => void;
  onAddTask: () => void;
}

const TaskForm = ({ newTask, newDescription, status, setNewTask, setNewDescription, setStatus, onAddTask }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
    <input
      type="text"
      value={newTask}
      onChange={e => setNewTask(e.target.value)}
      placeholder="Task name"
      className="col-span-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
    />
    <input
      type="text"
      value={newDescription}
      onChange={e => setNewDescription(e.target.value)}
      placeholder="Description"
      className="col-span-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
    />
    <select
      value={status}
      onChange={e => setStatus(e.target.value as TaskStatus)}
      className="col-span-1 px-4 py-2 border rounded-lg dark:bg-gray-800 dark:text-white"
    >
      <option value="To do">To Do</option>
      <option value="In progress">In Progress</option>
      <option value="Done">Done</option>
    </select>
    <button
      onClick={onAddTask}
      className="col-span-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
    >
      Add
    </button>
  </div>
);

export default TaskForm;
