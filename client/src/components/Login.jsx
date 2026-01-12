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

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const decoded = jwtDecode(credentialResponse.credential);
      
      const googleUser = {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture,
        googleId: decoded.sub
      };
      
      // Save googleUser into cookie (expires in 1 hour)
      const expires = new Date();
      expires.setTime(expires.getTime() + 60 * 60 * 1000); // 1 hour
      document.cookie = `googleUser=${encodeURIComponent(JSON.stringify(googleUser))}; expires=${expires.toUTCString()}; path=/`;

      console.log('Google login successful:', googleUser);
      
      // Check if user already has a profile
      try {
        const checkResponse = await fetch(`http://localhost:3000/users/check/${encodeURIComponent(googleUser.email)}`);
        const { exists } = await checkResponse.json();
        
        if (exists) {
          // User has a profile, fetch it
          const profileResponse = await fetch(`http://localhost:3000/users/profile/${encodeURIComponent(googleUser.email)}`);
          const profileData = await profileResponse.json();
          
          console.log('User profile found:', profileData);
          
          // Pass the profile data with a flag indicating user already exists
          if (onLoginSuccess) {
            onLoginSuccess(googleUser, profileData);
          }
        } else {
          // No profile exists, proceed to profile setup
          console.log('No profile found, redirecting to setup');
          if (onLoginSuccess) {
            onLoginSuccess(googleUser, null);
          }
        }
      } catch (error) {
        console.error('Error checking user profile:', error);
        // On error, proceed to profile setup as fallback
        if (onLoginSuccess) {
          onLoginSuccess(googleUser, null);
        }
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
