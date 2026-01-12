import { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
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

  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token from Google
      const decoded = jwtDecode(credentialResponse.credential);
      
      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        googleId: decoded.sub
      };
      
      console.log('Google login successful:', googleUser);
      
      // Pass the authenticated user to the parent component
      if (onLoginSuccess) {
        onLoginSuccess(googleUser);
      }
    } catch (error) {
      console.error('Error decoding Google credential:', error);
    }
  };
  
  const handleGoogleError = () => {
    console.error('Google login failed');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="welcome-text">Welcome</h1>
        <p className="login-subtitle">Sign in to continue</p>
        
        <div className="google-login-wrapper">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={handleGoogleError}
            useOneTap
            text={isMobile ? 'signin' : 'signin_with'}
            shape="rectangular"
            size="large"
            width="300"
          />
        </div>
      </div>
    </div>
  );
}

export default Login;
