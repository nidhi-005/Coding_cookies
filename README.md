## Facility Management System
A comprehensive facility management system for tracking the occupancy of various sports facilities in real-time. This application allows users to view facility statuses and enables admins to manage check-in and check-out processes, ensuring efficient usage of resources.

Table of Contents
Overview
Features
Technology Stack
Installation and Setup
Directory Structure
API Endpoints
Frontend Components
Environment Variables
Usage
Notes

### Overview
The Facility Management System is a full-stack application developed using the MERN stack (MongoDB, Express, React, and Node.js). It provides a real-time view of facility occupancy, showing whether facilities are Vacant or Occupied based on predefined maximum capacity limits.
Admin users can manage facility check-ins and check-outs, ensuring accurate occupancy data.

### 1. Clone the Repository

### 2. Setup Frontend
- Change to the frontend directory:
  cd frontend
- Install dependencies:
  npm install
- Start the frontend server:
  npm start
Open http://localhost:3000 to view the app.

### 3. Setup Backend
- Open a new terminal, and change to the backend/backend directory:
  cd backend/backend
- Install dependencies:
  npm install
- Start the backend server:
  npm start
The backend will run on http://localhost:5000 and connect to MongoDB.

Environment Variables
Create a .env file in the backend directory with the following content:
MONGO_URI=<mongodb+srv://nidhi-005:hello123@cluster0.odwtbit.mongodb.net/LIBRARY?retryWrites=true&w=majority&appName=Cluster0>

## Directory Structure
```
facility-management-system/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── images/
│   │   ├── styles/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
├── backend/
│   ├── backend/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
├── .env
└── README.md
```

