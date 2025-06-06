import React, { useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';

interface TaskItemProps {
  task: Task;
  onEditTitle: (id: string, newTitle: string) => void;
  onEditDescription: (id: string, newDescription: string) => void;
  onEditStatus: (id: string, newStatus: TaskStatus) => void;
  onDelete: (id: string) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onEditTitle, onEditDescription, onEditStatus, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTextTitle, setEditTextTitle] = useState(task.title);
  const [editTextDescription, setEditTextDescription] = useState(task.description);
  const [editStatus, setEditStatus] = useState(task.status);



  const handleSave = () => {
    if (editTextTitle.trim()) {
      onEditTitle(task._id, editTextTitle);
      setIsEditing(false);
    }

    if (editTextDescription.trim()) {
      onEditDescription(task._id, editTextDescription);
      setIsEditing(false);
    }

    if (editStatus.trim()) {
      onEditStatus(task._id, editStatus);
      setIsEditing(false);
    }
  };

  function getStatusColor(status: TaskStatus) {
    switch (status) {
      case 'To do':
        return 'bg-blue-50 dark:bg-blue-900';
      case 'In progress':
        return 'bg-yellow-50 dark:bg-yellow-900';
      case 'Done':
        return 'bg-green-50 dark:bg-green-900';
      default:
        return 'bg-gray-50 dark:bg-gray-800';
    }
  }

  return (
    <div
      className={`rounded-xl p-5 mb-4 shadow-md border-l-4 flex justify-between items-start ${getStatusColor(task.status)
        }`}
    >
      {/* Left Side */}
      <div className="flex flex-col gap-2 w-full pr-4">
        {/* Title */}
        {isEditing ? (
          <input
            value={editTextTitle}
            onChange={e => setEditTextTitle(e.target.value)}
            placeholder="Task title"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        ) : (
          <h2 className="text-lg font-semibold text-gray-800 dark:text-white">{task.title}</h2>
        )}

        {/* Description */}
        {isEditing ? (
          <input
            value={editTextDescription}
            onChange={e => setEditTextDescription(e.target.value)}
            placeholder="Description"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        ) : (
          <p className="text-sm text-gray-600 dark:text-gray-400">{task.description}</p>
        )}

        {/* Status */}
        {isEditing ? (
          <select
            value={editStatus}
            onChange={e => setEditStatus(e.target.value as TaskStatus)}
            className="mt-2 w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          >
            <option value="To do">To Do</option>
            <option value="In progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        ) : (
          <span className="mt-2 inline-block text-xs font-medium bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-white px-3 py-1 rounded-full w-fit">
            {task.status}
          </span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col gap-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 hover:bg-green-100 dark:hover:bg-green-800 px-3 py-1 rounded-lg transition"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 hover:bg-blue-100 dark:hover:bg-blue-800 px-3 py-1 rounded-lg transition"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => onDelete(task._id)}
          className="text-red-600 hover:bg-red-100 dark:hover:bg-red-800 px-3 py-1 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>

  );
};

export default TaskItem;
