// routes/facilityRoutes.js
import express from 'express';
import { getAllFacilities, updateOccupancy, checkIn, checkOut } from '../controllers/facilityController.js';

const router = express.Router();

router.get('/', getAllFacilities); // Get all facilities
router.post('/update', updateOccupancy); // Update occupancy count
router.post('/checkin', checkIn); // Check-in route for Admin
router.post('/checkout', checkOut); // Check-out route for Admin

export default router;

