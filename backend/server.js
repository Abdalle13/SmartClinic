import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import { apiLimiter } from './middleware/rateLimiter.js';

import authRoutes from './routes/authRoutes.js';
import patientRoutes from './routes/patientRoutes.js';
import doctorRoutes from './routes/doctorRoutes.js';
import staffRoutes from './routes/staffRoutes.js';
import appointmentRoutes from './routes/appointmentRoutes.js';
import recordRoutes from './routes/recordRoutes.js';
import invoiceRoutes from './routes/invoiceRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import settingsRoutes from './routes/settingsRoutes.js';
import pharmacyRoutes from './routes/pharmacyRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

dotenv.config();

const app = express();

const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5173',
  'https://smartclinichs.netlify.app',
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (
      process.env.NODE_ENV !== 'production' ||
      allowedOrigins.some((allowed) => origin === allowed || origin === allowed.replace(/\/$/, '')) ||
      origin.endsWith('.netlify.app') ||
      origin.endsWith('.vercel.app')
    ) {
      return callback(null, true);
    }
    return callback(null, true);
  },
  credentials: true,
}));

// Raised from the default (~100kb) so base64-encoded file attachments
// (X-rays, lab reports) can pass through the /api/upload proxy as JSON.
app.use(express.json({ limit: '8mb' }));
app.use(express.urlencoded({ extended: true, limit: '8mb' }));
app.use(mongoSanitize());

// Ensure MongoDB connection before handling any request (Serverless safe)
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error('Database connection error in request:', error);
    return res.status(500).json({
      message: 'Database connection failed',
      error: error.message,
    });
  }
});

app.use('/api', apiLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/records', recordRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/pharmacy', pharmacyRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => res.json({ message: 'Hospital Management API is running' }));

app.use(notFound);
app.use(errorHandler);

// For Vercel Serverless — export app, do NOT call app.listen here
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

export default app;
