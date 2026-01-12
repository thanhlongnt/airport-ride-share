import { useState } from 'react';
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
