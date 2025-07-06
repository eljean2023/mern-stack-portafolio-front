import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, deleteUser } from '../features/auth/authSlice';
import BASE_URL, { STATIC_BASE_URL } from '../config';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // 🔁 Cargar perfil al montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
      } catch (error) {
        console.error('Token inválido o expirado:', error.message);
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  // 🧠 Imagen de perfil: desde backend o default
  const getAvatarUrl = (user) => {
    if (!user || !user.avatar || user.avatar === 'null' || user.avatar === '') {
      return '/default-avatar.jpg'; // imagen local desde carpeta public
    }

    return user.avatar.startsWith('/uploads')
      ? `${STATIC_BASE_URL}${user.avatar}?t=${Date.now()}` // evita caché
      : user.avatar;
  };

  const avatarUrl = getAvatarUrl(user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser()).unwrap();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Failed to delete account:', err);
      alert('Error deleting account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {user ? (
        <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border"
          />
          <h2 className="text-2xl font-semibold mb-1">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/edit-profile"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;


/*
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, deleteUser } from '../features/auth/authSlice';
import BASE_URL from '../config';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // 🔁 Cargar perfil al montar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
      } catch (error) {
        console.error('Token inválido o expirado:', error.message);
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  // 🧠 Imagen de perfil: desde backend o default
  const getAvatarUrl = (user) => {
    if (!user || !user.avatar || user.avatar === 'null' || user.avatar === '') {
      return '/default-avatar.jpg';
    }
    return user.avatar.startsWith('/uploads')
      ? `http://localhost:5000${user.avatar}`
      : user.avatar;
  };

  const avatarUrl = getAvatarUrl(user);

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser()).unwrap();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Failed to delete account:', err);
      alert('Error deleting account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {user ? (
        <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4 border"
          />
          <h2 className="text-2xl font-semibold mb-1">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/edit-profile"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700 text-lg font-medium">Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;







/*
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, deleteUser } from '../features/auth/authSlice';
import BASE_URL from '../config';

function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch(setUser(res.data));
      } catch (error) {
        console.error('Invalid Token or expired:', error.message);
        localStorage.removeItem('token');
        dispatch(logout());
        navigate('/login');
      }
    };

    fetchProfile();
  }, [dispatch, navigate]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser()).unwrap();
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Failed to delete account:', err);
      alert('Error deleting account.');
    }
  };

  // 👇 Usa imagen local si no hay avatar en backend
  const avatarUrl = user?.avatar
    ? user.avatar.startsWith('/uploads') 
      ? `http://localhost:5000${user.avatar}` // Si viene del backend
      : user.avatar // Si ya es URL completa
    : '/default-avatar.jpg'; // Imagen local en public/

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {user ? (
        <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/edit-profile"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;



/*import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, logout, deleteUser } from '../features/auth/authSlice'; 
import BASE_URL from '../config';
import { STATIC_BASE_URL } from '../config';
 
function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) return navigate('/login');

  const fetchProfile = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(setUser(res.data));
    } catch (error) {
      console.error('Invalid Token or expired:', error.message);
      localStorage.removeItem('token');
      dispatch(logout());
      navigate('/login');
    }
  };

  fetchProfile();
}, [dispatch, navigate]);

  
  
  /*
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    axios.get(`${BASE_URL}/user/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => dispatch(setUser(res.data)))
      .catch(() => navigate('/login'));
  }, [dispatch, navigate]);

  */
 /*
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete your account?');
    if (!confirmDelete) return;

    try {
      await dispatch(deleteUser()).unwrap(); 
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error('Failed to delete account:', err);
      alert('Error deleting account.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {user ? (
        <div className="bg-white p-6 rounded shadow text-center max-w-sm w-full">
          <img
            src={`${STATIC_BASE_URL}${user.avatar || '/uploads/default-avatar.jpg'}`}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
          />
          <h2 className="text-2xl font-semibold mb-1">Welcome, {user.name}!</h2>
          <p className="text-gray-600 mb-4">{user.email}</p>

          <div className="flex flex-col gap-3">
            <Link
              to="/edit-profile"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
            >
              Edit Profile
            </Link>

            <button
              onClick={handleLogout}
              className="bg-blue-400 hover:bg-blue-600 text-white px-4 py-2 rounded"
            >
              Logout
            </button>

            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
            >
              Delete Account
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-700">Loading profile...</p>
      )}
    </div>
  );
}

export default ProfilePage;

*/