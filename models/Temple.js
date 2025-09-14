// models/Temple.js
import mongoose from 'mongoose';

const templeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: String,
  location: {
    address: String,
    city: String,
    state: String,
    pincode: String,
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  deity: String,
  founded: Date,
  images: [String],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  documents: [{
    type: String, // URLs to verification documents
    name: String,
    uploadedAt: Date
  }],
  trustCertificate: String,
  registrationNumber: String
}, {
  timestamps: true
});

export default mongoose.models.Temple || mongoose.model('Temple', templeSchema);