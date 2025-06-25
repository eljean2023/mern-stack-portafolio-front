import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../features/auth/authSlice';
import GoBackButton from '../components/GoBackButton';
import BASE_URL from '../config';


function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.token);
  const currentUser = useSelector((state) => state.auth.user);

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [preview, setPreview] = useState('');
  const [message, setMessage] = useState('');

  //  Get user from backend if not in Redux
  useEffect(() => {
    if (!token) return navigate('/login');

    if (!currentUser) {
      axios.get(`${BASE_URL}/user/profile`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => {
          dispatch(setUser(res.data));
          setName(res.data.name);
          setPreview(`${BASE_URL}${res.data.avatar}`);
        })
        .catch(() => navigate('/login'));
    } else {
      setName(currentUser.name);
      setPreview(`${BASE_URL}${currentUser.avatar}`);
    }
  }, [token, currentUser, dispatch, navigate]);

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

      dispatch(setUser(res.data)); // update user in Redux
      setMessage('Perfil actualizado correctamente ✅');
    } catch (err) {
      setMessage('Error al actualizar perfil ❌');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {currentUser ? (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-md w-full space-y-4">
          <h2 className="text-2xl font-semibold text-center">Edit Profile</h2>

          <div className="flex flex-col items-center">
            {preview && <img src={preview} alt="avatar" className="w-24 h-24 rounded-full object-cover mb-2" />}
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </div>

          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded"
            placeholder="Name"
          />

          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
            Save Changes
          </button>

          <GoBackButton />
          {message && <p className="text-center text-sm text-gray-700">{message}</p>}
        </form>
      ) : (
        <p className="text-gray-700">Loading...</p>
      )}
    </div>
  );
}

export default EditProfilePage;



