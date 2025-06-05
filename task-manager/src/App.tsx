// App.tsx
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import TasksPage from './pages/TasksPage';
import PrivateRoute from './routes/PrivateRoute';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tasks" element={<PrivateRoute><TasksPage /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
