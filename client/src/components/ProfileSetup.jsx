import { useState, useEffect, useRef } from 'react';
import './ProfileSetup.css';

function ProfileSetup({ onComplete, user }) {
  // Determine if we're editing an existing profile or creating a new one
  const isEditing = user?.phoneNumber ? true : false;

  const [formData, setFormData] = useState({
    email: user?.email || '',
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    instagramHandle: user?.instagramHandle || '',
    summary: user?.summary || '',
    profileImage: null
  });

  const [profileImagePreview, setProfileImagePreview] = useState(user?.profileImage || user?.picture || null);
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

  useEffect(() => {
    // Read googleUser from cookie and prefill form
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
      try {
        const googleUser = JSON.parse(googleUserCookie);
        setFormData(prevData => ({
          ...prevData,
          email: googleUser.email || '',
          name: googleUser.name || ''
        }));
        
        // Set profile image preview if picture is available
        if (googleUser.picture) {
          setProfileImagePreview(googleUser.picture);
        }
      } catch (error) {
        console.error('Error parsing googleUser cookie:', error);
      }
    }
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
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
    }
    
    // Instagram handle is now optional, but if provided it should start with @
    if (formData.instagramHandle.trim() && !formData.instagramHandle.startsWith('@')) {
      newErrors.instagramHandle = 'Instagram handle should start with @';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    try {
      // Prepare data to send (excluding profileImage for now as it needs special handling)
      const userData = {
        email: formData.email,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        instagramHandle: formData.instagramHandle,
        summary: formData.summary
      };

      let response;
      
      if (isEditing) {
        // Update existing user with PUT request
        console.log('Updating user profile:', formData.email);
        response = await fetch(`http://localhost:3000/users/${encodeURIComponent(formData.email)}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
      } else {
        // Create new user with POST request
        console.log('Creating new user profile');
        response = await fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData)
        });
      }

      if (!response.ok) {
        throw new Error(isEditing ? 'Failed to update profile' : 'Failed to create profile');
      }

      const result = await response.json();
      console.log(isEditing ? 'Profile updated:' : 'Profile created:', result);
      
      // Move to the next step
      if (onComplete) {
        onComplete(result);
      }
    } catch (error) {
      console.error(isEditing ? 'Error updating profile:' : 'Error creating profile:', error);
      setErrors({
        ...errors,
        submit: isEditing ? 'Failed to update profile. Please try again.' : 'Failed to create profile. Please try again.'
      });
    }
  };

  return (
    <div className="profile-setup-container">
      <div className="profile-setup-box">
        <h1 className="profile-title">{isEditing ? 'Edit Your Profile' : 'Complete Your Profile'}</h1>
        <p className="profile-subtitle">{isEditing ? 'Update your information' : 'Tell us a little about yourself'}</p>
        
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
            <label htmlFor="email">Email*</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? 'input-error' : ''}
              placeholder="your.email@example.com"
              autoComplete="email"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
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
            <label htmlFor="phoneNumber">Phone Number*</label>
            <input
              type="tel"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className={errors.phoneNumber ? 'input-error' : ''}
              placeholder="(123) 456-7890"
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9()-+ ]*"
            />
            {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
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
          
          {errors.submit && <div className="error-message">{errors.submit}</div>}
          
          <button 
            type="submit" 
            className="submit-button"
            role="button"
            aria-label={isEditing ? 'Save Profile' : 'Complete Profile'}
          >
            {isEditing ? (isMobile ? 'Save' : 'Save Changes') : (isMobile ? 'Complete' : 'Complete Profile')}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ProfileSetup;
