import './Profile.css';

function Profile({ user, onNavigateHome, onEdit }) {
  return (
    <div className="profile-container">
      <div className="profile-header">
        <button className="home-button" onClick={onNavigateHome}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          Home
        </button>
        <h1 className="profile-title">My Profile</h1>
        <button className="edit-button" onClick={onEdit}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
          </svg>
          Edit Profile
        </button>
      </div>

      <div className="profile-content">
        {(user.profileImage || user.picture) && (
          <div className="profile-image-container">
            <img 
              src={user.profileImage 
                ? (typeof user.profileImage === 'string' ? user.profileImage : URL.createObjectURL(user.profileImage))
                : user.picture
              }
              alt="Profile" 
              className="profile-image-large" 
            />
          </div>
        )}

        <div className="profile-details">
          <div className="profile-section">
            <h2 className="section-title">Personal Information</h2>
            
            <div className="detail-item">
              <span className="detail-label">Name</span>
              <span className="detail-value">{user.name}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Email</span>
              <span className="detail-value">{user.email}</span>
            </div>

            <div className="detail-item">
              <span className="detail-label">Phone</span>
              <span className="detail-value">{user.phoneNumber}</span>
            </div>

            {user.instagramHandle && (
              <div className="detail-item">
                <span className="detail-label">Instagram</span>
                <span className="detail-value">{user.instagramHandle}</span>
              </div>
            )}
          </div>

          {user.summary && (
            <div className="profile-section">
              <h2 className="section-title">About Me</h2>
              <p className="about-text">{user.summary}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
