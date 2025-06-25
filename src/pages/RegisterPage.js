import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerRequest, registerSuccess, registerFailure } from '../features/register/registerSlice';
import BASE_URL from '../config';
  
function RegisterForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) navigate('/profile');
  }, [navigate]);

  const onSubmit = async (data) => {
    dispatch(registerRequest());
    try {
      const res = await axios.post(`${BASE_URL}/auth/register`, data);
      setMessage(res.data.msg);
      dispatch(registerSuccess(res.data.msg));
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const msg = err.response?.data?.msg || 'Error al registrar';
      setError(msg);
      dispatch(registerFailure(msg));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 animate-fade-in"
    >
      <h2 className="text-2xl mb-4 text-center font-semibold text-green-600">Create an Account</h2>

      <div className="mb-3">
        <input
          {...register('name', { required: 'Nombre requerido' })}
          placeholder="Nombre"
          className="w-full p-2 border rounded"
        />
        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
      </div>

      <div className="mb-3">
        <input
          {...register('email', { required: 'Email requerido' })}
          placeholder="Email"
          className="w-full p-2 border rounded"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>

      <div className="mb-4">
        <input
          {...register('password', { required: 'Contraseña requerida' })}
          placeholder="Contraseña"
          type="password"
          className="w-full p-2 border rounded"
        />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
      </div>

      <button
        type="submit"
        className="bg-green-600 w-full text-white py-2 rounded hover:bg-green-700 transition"
      >
        Register
      </button>

      {message && <p className="text-green-600 mt-3 text-center">{message} Redirecting...</p>}
      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
    </form>
  );
}

export default RegisterForm;
