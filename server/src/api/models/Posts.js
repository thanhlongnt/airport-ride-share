import mongoose from 'mongoose';

const postsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  direction: {
    type: String,
    required: true,
    enum: ['campus-to-airport', 'airport-to-campus']
  },
  departureTime: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'resolved'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Posts = mongoose.model('Post', postsSchema);

export default Posts;
