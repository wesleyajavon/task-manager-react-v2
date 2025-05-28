import React, { useState, useEffect } from 'react';
import TaskItem from './components/TaskItem';
import type { Task, TaskStatus } from './types/Task';

const API_BASE_URL = import.meta.env.VITE_API_URL;


const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('To do');
  const [filterStatus, setFilterStatus] = useState<"All" | TaskStatus>("All");

  useEffect(() => {
    try {const fetchTasks = async () => {
      const res = await fetch(`${API_BASE_URL}/api/tasks`);
      const data = await res.json();
      const normalized = data.map((task: any) => ({
        id: task._id,
        title: task.title,
        description: task.description,
        status: task.status,
      }));
      setTasks(normalized);
    };

    fetchTasks();} catch(error) {
      console.log(error)
    }
  }, []);

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updates),
      });
      const updatedTask = await res.json();

      setTasks(prev =>
        prev.map(task =>
          task._id === id || task._id === id ? { ...task, ...updatedTask } : task
        )
      );
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  const handleAddTask = async () => {
    if (!newTask.trim() || !newDescription.trim()) return;

    try {
      const response = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTask,
          description: newDescription,
          status: status,
        }),
      });

      const savedTask = await response.json();


      setTasks(prev => [savedTask, ...prev]);
      setNewTask('');
      setNewDescription('')
      setStatus('To do');
    } catch (error) {
      console.error('Failed to add task:', error);

    }

  };

  const handleEditTask = (id: string, newTitle: string) => {
    updateTask(id, { title: newTitle });

  };

  const handleEditTaskDescription = (id: string, newDescription: string) => {
    updateTask(id, { description: newDescription });
  };

  const handleEditTaskStatus = (id: string, newStatus: TaskStatus) => {
    updateTask(id, { status: newStatus });
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'DELETE',
      });
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  };

  const filteredTasks = tasks.filter((task) => {
    return filterStatus === "All" || task.status === filterStatus;
  });



  return (

    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-black-600">Task Manager 📝 - MongoDB</h1>


        <div className="flex gap-2 my-4">
          {["All", "To do", "In progress", "Done"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status as typeof filterStatus)}
              className={`px-3 py-1 rounded cursor-pointer ${filterStatus === status ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            placeholder="Task name"
            className="border px-3 py-2 mr-2 rounded"
          />
          <input
            type="text"
            value={newDescription}
            onChange={e => setNewDescription(e.target.value)}
            placeholder="Description"
            className="border px-3 py-2 mr-2 rounded"
          />
          <select
            value={status}
            onChange={e => setStatus(e.target.value as TaskStatus)}
            className="border px-2 py-2 mr-2 rounded"
          >
            <option value="To do">To Do</option>
            <option value="In progress">In progress</option>
            <option value="Done">Done</option>
          </select>
          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer"
          >
            Add
          </button>
        </div>

        {tasks.length === 0 ? (
          <p className="text-gray-500">No tasks yet.</p>
        ) : (
          filteredTasks.map(task => (
            <TaskItem
              key={task._id}
              task={task}
              onEditTitle={handleEditTask}
              onEditDescription={handleEditTaskDescription}
              onEditStatus={handleEditTaskStatus}
              onDelete={handleDeleteTask}
            />
          ))
        )}

      </div>
    </div>

  );
};

export default App;
