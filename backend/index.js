const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MongoDB connection
try {
    await mongoose.connect(process.env.MONGO_URI), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify:false
    };
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }

// Schema for users (basic structure with roll number and name)
const userSchema = new mongoose.Schema({
    rollnumber: String,
    name: String,
});

const badminton = mongoose.model('badminton', userSchema);
const tableTennis = mongoose.model('table_tennis', userSchema);
const squash = mongoose.model('squash', userSchema);
const gym = mongoose.model('gym', userSchema);

// Helper function to check occupancy
const getOccupancyStatus = async (model, maxCapacity) => {
    const count = await model.countDocuments();
    return {
        count,
        status: count >= maxCapacity ? 'Occupied' : 'Vacant',
    };
};

// API to get occupancy status for all facilities
app.get('/occupancy', async (req, res) => {
    try {
        const data = await Promise.all([
            getOccupancyStatus(badminton, 16),
            getOccupancyStatus(tableTennis, 8),
            getOccupancyStatus(squash, 8),
            getOccupancyStatus(gym, 20),
        ]);

        res.json({
            badminton: data[0],
            tableTennis: data[1],
            squash: data[2],
            gym: data[3],
        });
    } catch (err) {
        res.status(500).send('Error fetching data');
    }
});

app.use(cors());

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
