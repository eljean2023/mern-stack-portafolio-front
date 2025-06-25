import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useState } from 'react'
import BASE_URL from '../config'


function ForgotPasswordForm() {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

  const onSubmit = async (data) => {
    try { 
    const res = await axios.post(`${BASE_URL}/auth/forgot-password`, data);
      setMessage(res.data.msg)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.msg || 'Error sending mail')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4 text-center">Recover Password</h2>

      <input
        {...register('email', { required: 'Email required' })}
        placeholder="Email"
        className="w-full p-2 mb-3 border rounded"
      />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <button type="submit" className="bg-purple-600 w-full text-white py-2 rounded hover:bg-purple-400">Send link</button>

      {message && <p className="text-green-600 mt-3 text-center">{message}</p>}
      {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
    </form>
  )
}

export default ForgotPasswordForm
