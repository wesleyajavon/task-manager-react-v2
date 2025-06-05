import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const LogoutButton = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <button
      onClick={handleLogout}
      className="text-sm px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow transition"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
