import './Home.css';

function Home({ user, onNavigateProfile }) {
  return (
    <div className="home-container">
      <div className="home-header">
        <button className="profile-icon-button" onClick={onNavigateProfile} title="View Profile">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </button>
      </div>
      <div className="home-content">
        {user.profileImage && (
          <div className="profile-image-display">
            <img 
              src={typeof user.profileImage === 'string' ? user.profileImage : URL.createObjectURL(user.profileImage)}
              alt="Profile" 
              className="profile-image" 
            />
          </div>
        )}
        <h1 className="welcome-heading">Welcome, {user.name}!</h1>
        <p className="success-message">Your profile has been created successfully.</p>
        
        <div className="profile-summary">
          {user.instagramHandle && (
            <div className="profile-field">
              <span className="field-label">Instagram:</span>
              <span className="field-value">{user.instagramHandle}</span>
            </div>
          )}
          <div className="profile-field">
            <span className="field-label">Phone:</span>
            <span className="field-value">{user.phoneNumber}</span>
          </div>
          {user.summary && (
            <div className="profile-field summary-field">
              <span className="field-label">About:</span>
              <p className="field-value summary-text">{user.summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
