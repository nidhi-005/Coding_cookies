// controllers/facilityController.js
import Facility from '../models/Facility.js';
import User from '../models/User.js';

// Check-in functionality for Admin
export const checkIn = async (req, res) => {
  const { name, rollNo, sport } = req.body;

  try {
    const facility = await Facility.findOne({ name: sport });
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    if (facility.currentOccupancy >= facility.maxOccupancy) {
      return res.status(400).json({ message: 'Facility is full' });
    }

    // Add the user to the facility's occupancy
    facility.currentOccupancy += 1;
    await facility.save();

    // Add a check-in record for the user
    const user = await User.findOneAndUpdate(
      { email: req.user.email },
      { $push: { checkedInFacilities: { name, rollNo, sport, checkedIn: true } } },
      { new: true }
    );

    res.status(200).json({ message: 'Check-in successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Check-out functionality for Admin
export const checkOut = async (req, res) => {
  const { userId, sport } = req.body;

  try {
    const facility = await Facility.findOne({ name: sport });
    if (!facility) {
      return res.status(404).json({ message: 'Facility not found' });
    }

    facility.currentOccupancy -= 1;
    await facility.save();

    // Remove check-in record for the user
    const user = await User.findByIdAndUpdate(
      userId,
      { $pull: { checkedInFacilities: { sport, checkedIn: true } } },
      { new: true }
    );

    res.status(200).json({ message: 'Check-out successful', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
