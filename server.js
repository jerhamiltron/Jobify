import express from 'express';
import dotenv from 'dotenv';
import 'express-async-errors';
import morgan from 'morgan';

const app = express();

dotenv.config();

// db and authenticateUser
import connectDB from './db/connect.js';

// routers
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRouter.js';

// Middleware
import notFound from './middleware/not-found.js';
import errorHandler from './middleware/error-handler.js';

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

app.use(express.json());

app.get('/', (req, res) => {
  res.json({
    status: 'Connected',
    message: 'Welcome!',
  });
});

app.get('/api/v1', (req, res) => {
  res.json({
    message: 'API',
  });
});

app.use('/api/v1/auth', authRouter);

app.use('/api/v1/jobs', jobsRouter);

app.use(notFound);

app.use(errorHandler);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    const url = process.env.MONGO_URL.replace('<password>', process.env.MONGO_PASSWORD);
    await connectDB(url);
    app.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
