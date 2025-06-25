import { useForm } from 'react-hook-form';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess, loginFailure } from '../features/auth/authSlice'; 
import BASE_URL from '../config';

function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/profile');
  }, [navigate]);

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/login`, data);
      const { token, user } = res.data;

      localStorage.setItem('token', token);

      dispatch(loginSuccess({ user, token }));

      navigate('/profile');
    } catch (err) {
      const message = err.response?.data?.msg || 'Incorrect credentials';
      setError(message);
      dispatch(loginFailure(message)); 
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 animate-fade-in"
    >
      <h2 className="text-2xl mb-4 text-center font-semibold text-blue-400">Log In</h2>

      <div className="mb-3">
        <input
          {...register('email', { required: 'Email required' })}
          placeholder="Email"
          type="email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <input
          {...register('password', { required: 'Password required' })}
          placeholder="password"
          type="password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-blue-400 w-full text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Enter
      </button>

      <div className="mt-4 text-sm text-center">
        <Link to="/forgot-password" className="text-blue-400 hover:underline">
          Forgot your password?
        </Link>
      </div>
      {error && <p className="text-red-400 mt-3 text-center">{error}</p>}
    </form>
  );
}

export default LoginForm;



     