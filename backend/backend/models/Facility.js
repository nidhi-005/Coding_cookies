// models/Facility.js
import mongoose from 'mongoose';

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  maxOccupancy: { type: Number, required: true },
  currentOccupancy: { type: Number, default: 0 },
});

const Facility = mongoose.model('Facility', facilitySchema);
export default Facility;
