import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3005;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date() });
});

// Import and use routes
import apiRoutes from '../routes/api.js';
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`Whatsnext Backend running on port ${PORT}`);
});
