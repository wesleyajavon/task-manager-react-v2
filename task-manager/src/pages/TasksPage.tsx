// pages/TasksPage.tsx
import { useEffect, useState } from 'react';
import type { Task, TaskStatus } from '../types/Task';
import StatusFilter from '../components/StatusFilter';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import Footer from "../components/Footer";
import LogoutButton from '../components/LogoutButton';



const API_BASE_URL = import.meta.env.VITE_API_URL;
//const API_BASE_URL = "http://localhost:3001";

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [status, setStatus] = useState<TaskStatus>('To do');
  const [filterStatus, setFilterStatus] = useState<"All" | TaskStatus>("All");
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/tasks`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  const filteredTasks = tasks.filter(task => filterStatus === "All" || task.status === filterStatus);

  const updateTask = async (id: string, updates: Partial<Task>) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });
      const updated = await res.json();
      setTasks(prev => prev.map(task => task._id === id ? { ...task, ...updated } : task));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAddTask = async () => {
    if (!newTask || !newDescription) return;
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: newTask, description: newDescription, status }),
      });
      const newAdded = await res.json();
      setTasks(prev => [newAdded, ...prev]);
      setNewTask('');
      setNewDescription('');
      setStatus('To do');
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id: string) => {
    try {
      await fetch(`${API_BASE_URL}/api/tasks/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(prev => prev.filter(task => task._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Task Manager 📝 <span className="text-sm text-gray-500">with MongoDB</span>
        </h1>

        <StatusFilter filterStatus={filterStatus} setFilterStatus={setFilterStatus} />
        <TaskForm
          newTask={newTask}
          newDescription={newDescription}
          status={status}
          setNewTask={setNewTask}
          setNewDescription={setNewDescription}
          setStatus={setStatus}
          onAddTask={handleAddTask}
        />
        <TaskList
          tasks={filteredTasks}
          onEditTitle={(id, title) => updateTask(id, { title })}
          onEditDescription={(id, description) => updateTask(id, { description })}
          onEditStatus={(id, status) => updateTask(id, { status })}
          onDelete={handleDeleteTask}
        />
      </div>
      <div className="flex justify-center mb-4 mt-10">
        <LogoutButton />
      </div>
      <Footer />
    </div>

  );
}
