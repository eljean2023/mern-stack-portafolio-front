import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProfilePage from './pages/ProfilePage'
import EditProfilePage from './pages/EditProfilePage'
import ResetPasswordPage from './pages/ResetPasswordPage' 
import AboutPage from './pages/AboutPage';

import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
  <Route path="/" element={<AboutPage />} />
  <Route path="/landingPage" element={<LandingPage />} />
  <Route path="/login" element={<LoginPage />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/forgot-password" element={<ForgotPasswordPage />} />
  
  <Route
    path="/profile"
    element={
      <PrivateRoute>
        <ProfilePage />
      </PrivateRoute>
    }
  />
  
  <Route
    path="/edit-profile"
    element={
      <PrivateRoute>
        <EditProfilePage />
      </PrivateRoute>
    }
  />
  
  <Route path="/reset-password/:token" element={<ResetPasswordPage />} />
</Routes>
    </Router>
  )
}

export default App




