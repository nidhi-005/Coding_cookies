// routes/facilityRoutes.js
import express from 'express';
import { getAllFacilities, updateOccupancy } from '../controllers/facilityController.js';

const router = express.Router();

router.get('/', getAllFacilities); // Get all facility data
router.post('/update', updateOccupancy); // Update occupancy count

export default router;
