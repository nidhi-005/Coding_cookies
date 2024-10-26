import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://lms-sitesculptors-backend.onrender.com/api', // Replace with your actual backend URL
  timeout: 5000,
  headers: { 'Content-Type': 'application/json' }
});

export default instance;
