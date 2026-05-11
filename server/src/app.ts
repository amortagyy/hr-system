import express from 'express';
import cors from 'cors';
import { config } from './config';
import authRoutes from './routes/auth';
import employeeRoutes from './routes/employees';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Error handling
app.use((err: any, req: any, res: any, next: any) => {
  console.error('Error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

// Start server
app.listen(config.port, () => {
  console.log(`✓ Server running on http://localhost:${config.port}`);
  console.log(`✓ Environment: ${config.nodeEnv}`);
});

export default app;
