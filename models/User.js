// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not Google auth
    }
  },
  googleId: String,
  phone: String,
  avatar: String,
  role: {
    type: String,
    enum: ['donor', 'temple_admin', 'super_admin'],
    default: 'donor'
  },
  verified: {
    type: Boolean,
    default: false
  },
  totalDonated: {
    type: Number,
    default: 0
  },
  donationCount: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model('User', userSchema);