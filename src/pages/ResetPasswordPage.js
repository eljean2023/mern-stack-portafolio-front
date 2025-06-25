// src/pages/ResetPasswordPage.js
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BASE_URL from '../config'

function ResetPasswordPage() {
  const { token } = useParams();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`${BASE_URL}/auth/reset-password/${token}`, {
        password: data.password
      });
      alert(res.data.msg);
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Error al actualizar contraseña');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Reset Password</h2>
        <div className="mb-4">
          <label className="block mb-1 font-medium">New password</label>
          <input
            type="password"
            {...register('password', { required: 'Requerido' })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded w-full">
          Change password
        </button>
      </form>
    </div>
  );
}

export default ResetPasswordPage;
