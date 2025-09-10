import { useState } from 'react';
import './App.css';
import Login from './components/Login';
import ProfileSetup from './components/ProfileSetup';
import Home from './components/Home';

// App flow stages
const STAGES = {
  LOGIN: 'login',
  PROFILE_SETUP: 'profile_setup',
  HOME: 'home'
};

function App() {
  const [currentStage, setCurrentStage] = useState(STAGES.LOGIN);
  const [user, setUser] = useState(null);
  
  // Handle successful Google authentication
  const handleLoginSuccess = (googleUser) => {
    // In a real app, you would get this data from the Google Auth response
    // For this example, we're creating a mock user object
    setUser({
      id: 'google-user-123',
      email: 'user@example.com',
      // Other Google profile info would go here
    });
    
    // Move to profile setup stage
    setCurrentStage(STAGES.PROFILE_SETUP);
  };
  
  // Handle profile completion
  const handleProfileComplete = (profileData) => {
    // Create a copy of profile data for processing
    const processedProfileData = {...profileData};
    
    // If there's a profile image, create a data URL for storage
    // In a real app, you'd upload this to a server and store the URL
    if (profileData.profileImage) {
      // We're keeping the File object as is for this example
      // In a real application, you would upload the file to a server
      // and store the URL instead
      console.log('Profile image received:', profileData.profileImage.name);
    }
    
    // Update user with profile data
    setUser({
      ...user,
      ...processedProfileData
    });
    
    // Move to home stage
    setCurrentStage(STAGES.HOME);
  };

  // Render the appropriate component based on the current stage
  const renderCurrentStage = () => {
    switch (currentStage) {
      case STAGES.LOGIN:
        return <Login onLoginSuccess={handleLoginSuccess} />;
        
      case STAGES.PROFILE_SETUP:
        return <ProfileSetup onComplete={handleProfileComplete} />;
        
      case STAGES.HOME:
        return <Home user={user} />;
        
      default:
        return <Login onLoginSuccess={handleLoginSuccess} />;
    }
  };

  return (
    <div className="app-container">
      {renderCurrentStage()}
    </div>
  );
}

export default App
