import mongoose from 'mongoose';

/**
 * User Schema
 * Defines the structure and validation for user documents
 */
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Invalid email format']
  },
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
    trim: true,
    match: [/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/, 'Invalid phone number format']
  },
  instagramHandle: {
    type: String,
    trim: true,
    default: null,
    validate: {
      validator: function(v) {
        return !v || v.startsWith('@');
      },
      message: 'Instagram handle must start with @'
    }
  },
  summary: {
    type: String,
    trim: true,
    default: null
  },
  profileImage: {
    type: String,
    default: null
  }
}, {
  timestamps: true // Automatically adds createdAt and updatedAt
});

// Instance methods
userSchema.methods.toJSON = function() {
  const userObject = this.toObject();
  return userObject;
};

// Static methods
userSchema.statics.findByEmail = async function(email) {
  return await this.findOne({ email: email.toLowerCase() });
};

const User = mongoose.model('User', userSchema);

export default User;
