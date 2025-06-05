import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/authContext';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3001/api/auth/register', { email, password });
      login(res.data.token, res.data.user);
      navigate('/tasks');
    } catch (err: any) {
      console.log(err);
      alert(err.response?.data?.msg || 'Registration failed');
    }
  };

  return (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-800 to-purple-700">
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-sm"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
        Create an Account
      </h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="Enter your email"
          required
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white"
          placeholder="Create a password"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
      >
        Register
      </button>

      <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-500 hover:underline">
          Login
        </a>
      </p>
    </form>
  </div>
)}
