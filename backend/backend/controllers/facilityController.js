// controllers/facilityController.js
import Facility from '../models/Facility.js';

// Get occupancy status for all facilities
export const getAllFacilities = async (req, res) => {
  try {
    const facilities = await Facility.find();
    res.json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update occupancy for a specific facility
export const updateOccupancy = async (req, res) => {
  const { facilityName, increment } = req.body;

  try {
    const facility = await Facility.findOne({ name: facilityName });

    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    const newOccupancy = facility.currentOccupancy + (increment ? 1 : -1);

    if (newOccupancy < 0 || newOccupancy > facility.maxOccupancy) {
      return res.status(400).json({ message: 'Occupancy limit exceeded' });
    }

    facility.currentOccupancy = newOccupancy;
    await facility.save();

    res.status(200).json({ message: 'Occupancy updated successfully', facility });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
