import { useEffect, useState } from 'react';
import googleLogo from '../assets/auth/google-logo.svg';
import './Login.css';

function Login({ onLoginSuccess }) {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    // Check if the device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleGoogleLogin = () => {
    // In a real application, this would initiate Google OAuth flow
    console.log('Google login clicked');
    
    // Simulate a successful login
    // In a real app, you would get a response from Google with user info
    const mockGoogleUser = {
      id: 'google-user-123',
      email: 'user@example.com',
      name: 'User', // Often provided by Google but we'll let the user confirm/update it
      picture: 'https://example.com/profile.jpg'
    };
    
    // Pass the authenticated user to the parent component
    if (onLoginSuccess) {
      onLoginSuccess(mockGoogleUser);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="welcome-text">Welcome</h1>
        <p className="login-subtitle">Sign in to continue</p>
        
        <button 
          className="google-login-button" 
          onClick={handleGoogleLogin}
          role="button"
          aria-label="Sign in with Google"
        >
          <img src={googleLogo} alt="" className="google-logo" aria-hidden="true" />
          <span>{isMobile ? 'Google Login' : 'Sign in with Google'}</span>
        </button>
      </div>
    </div>
  );
}

export default Login;
