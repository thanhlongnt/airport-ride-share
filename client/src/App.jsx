import { useState, useEffect } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import Home from './components/Home';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const STAGES = {
  LOGIN: 'login',
  PROFILE_SETUP: 'profile_setup',
  HOME: 'home'
};

function App() {
  const [currentStage, setCurrentStage] = useState(STAGES.LOGIN);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Read googleUser from cookie
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) {
            return decodeURIComponent(parts.pop().split(';').shift());
          }
          return null;
        };

        const googleUserCookie = getCookie('googleUser');
        
        if (googleUserCookie) {
          const googleUser = JSON.parse(googleUserCookie);
          console.log('Found existing session for:', googleUser.email);
          
          // Check if user has a profile
          const checkResponse = await fetch(`http://localhost:3000/users/check/${encodeURIComponent(googleUser.email)}`);
          const { exists } = await checkResponse.json();
          
          if (exists) {
            // Fetch the profile
            const profileResponse = await fetch(`http://localhost:3000/users/profile/${encodeURIComponent(googleUser.email)}`);
            const profileData = await profileResponse.json();
            
            console.log('Session restored with profile:', profileData);
            
            // Set user and go to home
            setUser({
              ...googleUser,
              ...profileData
            });
            setCurrentStage(STAGES.HOME);
          } else {
            // User logged in but hasn't completed profile setup
            console.log('Session found but no profile, redirecting to setup');
            setUser(googleUser);
            setCurrentStage(STAGES.PROFILE_SETUP);
          }
        } else {
          console.log('No existing session found');
        }
      } catch (error) {
        console.error('Error restoring session:', error);
        // On error, stay on login page
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);
  
  const handleLoginSuccess = (googleUser, profileData) => {
    if (profileData) {
      // User already has a profile, go directly to home
      setUser({
        ...googleUser,
        ...profileData
      });
      setCurrentStage(STAGES.HOME);
    } else {
      // No profile exists, go to profile setup
      setUser({
        ...googleUser
      });
      setCurrentStage(STAGES.PROFILE_SETUP);
    }
  };
  
  const handleProfileComplete = (profileData) => {
    const processedProfileData = {...profileData};
    
    if (profileData.profileImage) {
      console.log('Profile image received:', profileData.profileImage.name);
    }
    
    setUser({
      ...user,
      ...processedProfileData
    });
    
    setCurrentStage(STAGES.HOME);
  };

  const renderCurrentStage = () => {
    // Show loading state while checking for existing session
    if (isLoading) {
      return (
        <div className="loading-container" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          height: '100vh' 
        }}>
          <p>Loading...</p>
        </div>
      );
    }

    switch (currentStage) {
      case STAGES.LOGIN:
        return <Login onLoginSuccess={handleLoginSuccess} />;
        
      case STAGES.PROFILE_SETUP:
        return <ProfileSetup onComplete={handleProfileComplete} user={user} />;
        
      case STAGES.HOME:
        return <Home user={user} />;
        
      default:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="app-container">
        {renderCurrentStage()}
      </div>
    </GoogleOAuthProvider>
  );
}

export default App
