import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import authRoutes from './routes/authRoutes.js';
import resumeRoutes from './routes/resumeRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import companyRoutes from './routes/companyRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/job', jobRoutes);
app.use('/api/company', companyRoutes);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
})
.catch(err => {
  console.log('\n❌ FATAL: Could not connect to MongoDB Atlas!');
  console.log('----------------------------------------------------');
  console.log('Your backend server crashed because it could not connect to your Database.');
  console.log('Most common fixes:');
  console.log('  1. Your IP Address is NOT whitelisted. Go to MongoDB Atlas -> Network Access -> Add IP Address -> Allow Access From Anywhere.');
  console.log('  2. Your Database Username/Password is incorrect.');
  console.log('----------------------------------------------------\n');
  console.error('Raw Error:', err.message);
  process.exit(1);
});
