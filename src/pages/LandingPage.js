import { Link } from 'react-router-dom'

function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-gray-500 flex flex-col items-center justify-center">
      <h1 className="text-4xl font-bold mb-6 text-gray-100">Welcome to my Portal</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow">Log In</Link>
        <Link to="/register" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow">Register</Link>
      </div>
    </div>
  )
}

export default LandingPage
