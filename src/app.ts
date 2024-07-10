import express, { Application } from 'express';
import router from './routes';

const app: Application = express();

// Middleware
app.use(express.json());

// Routes
app.use('/api', router);

export default app;
