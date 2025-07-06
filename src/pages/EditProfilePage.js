import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import GoBackButton from '../components/GoBackButton';
import BASE_URL, { STATIC_BASE_URL } from '../config';

function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);


  const getAvatarUrl = (user) => {
    if (!user || !user.avatar || user.avatar === 'null' || user.avatar === '') {
      return '/default-avatar.jpg'; 
    }
    return user.avatar.startsWith('/uploads')
      ? `${STATIC_BASE_URL}${user.avatar}?t=${Date.now()}`
      : user.avatar;
  };

  useEffect(() => {
    if (!token) return navigate('/login');

    const loadUser = async () => {
      try {
        const { data } = await axios.get(`${BASE_URL}/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        dispatch(setUser(data));
        setName(data.name);
        setPreview(getAvatarUrl(data));
      } catch (err) {
        console.error('Failed to fetch user:', err);
        navigate('/login');
      }
    };

    if (!currentUser) {
      loadUser();
    } else {
      setName(currentUser.name);
      setPreview(getAvatarUrl(currentUser));
    }
  }, [token, currentUser, dispatch, navigate]);

  // 🔁 Manejo de archivo y preview local
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('name', name);
    if (avatar) formData.append('avatar', avatar);

    try {
      const res = await axios.put(`${BASE_URL}/user/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      dispatch(setUser(res.data));
      setAvatar(null);
      setPreview(getAvatarUrl(res.data)); 
      setMessage('✅ Perfil actualizado correctamente');
    } catch (err) {
      console.error(err);
      setMessage('❌ Error al actualizar perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      {currentUser ? (
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded shadow max-w-md w-full space-y-4"
        >
          <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>

          <div className="flex flex-col items-center">
            {preview ? (
              <img
                src={preview}
                alt="avatar"
                className="w-24 h-24 rounded-full object-cover mb-2 border"
              />
            ) : (
              <div className="w-24 h-24 mb-2 rounded-full bg-gray-200 animate-pulse" />
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="text-sm"
            />
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Name"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded text-white ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>

          <GoBackButton />

          {message && (
            <p
              className={`text-center text-sm ${
                message.includes('✅') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {message}
            </p>
          )}
        </form>
      ) : (
        <p className="text-gray-700">Loading...</p>
      )}
    </div>
  );
}

export default EditProfilePage;

