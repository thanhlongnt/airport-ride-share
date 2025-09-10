import { useState, useEffect, useRef } from 'react';
import './ProfileSetup.css';

function ProfileSetup({ onComplete }) {
  const [formData, setFormData] = useState({
    name: '',
    instagramHandle: '',
    phoneNumber: '',
    summary: '',
    profileImage: null
  });

  const [profileImagePreview, setProfileImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const [errors, setErrors] = useState({});
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const handleImageClick = () => {
    // Trigger file input click when the profile image area is clicked
    fileInputRef.current.click();
  };
  
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    // Validate file is an image
    if (!file.type.match('image.*')) {
      setErrors({
        ...errors,
        profileImage: 'Please select an image file (jpg, png, etc.)'
      });
      return;
    }
    
    // Validate file size (less than 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrors({
        ...errors,
        profileImage: 'Image must be less than 5MB'
      });
      return;
    }
    
    // Clear any existing errors
    if (errors.profileImage) {
      setErrors({
        ...errors,
        profileImage: ''
      });
    }
    
    // Set the file in form data
    setFormData({
      ...formData,
      profileImage: file
    });
    
    // Create and set image preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setProfileImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    // Instagram handle is now optional, but if provided it should start with @
    if (formData.instagramHandle.trim() && !formData.instagramHandle.startsWith('@')) {
      newErrors.instagramHandle = 'Instagram handle should start with @';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Save profile data (this would typically go to a backend)
    console.log('Profile created:', formData);
    
    // Move to the next step
    if (onComplete) {
      onComplete(formData);
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-box">
        <h1 className="profile-title">Complete Your Profile</h1>
        <p className="profile-subtitle">Tell us a little about yourself</p>
        
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="profile-image-container">
            <div 
              className="profile-image-upload" 
              onClick={handleImageClick}
              style={{
                backgroundImage: profileImagePreview ? `url(${profileImagePreview})` : 'none'
              }}
            >
              {!profileImagePreview && (
                <div className="upload-placeholder">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                  <span>Add Photo</span>
                </div>
              )}
            </div>
            <input 
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              accept="image/*"
              className="file-input"
            />
            {errors.profileImage && <span className="error-message">{errors.profileImage}</span>}
          </div>
          <div className="form-group">
            <label htmlFor="name">Name*</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={errors.name ? 'input-error' : ''}
              placeholder="Your full name"
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="instagramHandle">Instagram Handle (Optional)</label>
            <input
              type="text"
              id="instagramHandle"
              name="instagramHandle"
              value={formData.instagramHandle}
              onChange={handleChange}
              className={errors.instagramHandle ? 'input-error' : ''}
              placeholder="@yourusername"
            />
            {errors.instagramHandle && <span className="error-message">{errors.instagramHandle}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'input-error' : ''}
              placeholder="(123) 456-7890"
              // Mobile-specific attributes for better phone input handling
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9()-+ ]*"
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="summary">Summary (Optional)</label>
            <textarea
              id="summary"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              placeholder="Tell us a little about yourself"
              rows="3"
            />
          </div>
          
          <button 
            type="submit" 
            className="submit-button"
            role="button"
            aria-label="Complete Profile"
          >
            {isMobile ? 'Complete' : 'Complete Profile'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
