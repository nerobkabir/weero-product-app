import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './src/config/db.js';
import productRoutes from './src/routes/productRoutes.js';
import authRoutes from './src/routes/authRoutes.js';
import { errorHandler, notFound } from './src/middleware/errorMiddleware.js';

dotenv.config();

connectDB();

const app = express();

// Security and Middleware 
app.use(helmet());
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://weero-product-app.vercel.app',
    process.env.CLIENT_URL,
  ].filter(Boolean),
  credentials: true,
}));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Weero Product API is running...' });
});

// Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});