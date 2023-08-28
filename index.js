import express from 'express';
import connectDB from './db.js';
const app = express();

const PORT = process.env.PORT || 5000;

// Connect to the MongoDB database
connectDB();

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

// app.js ............................................................................................

 import cors from 'cors';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

// Import your route modules here
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import fileRoutes from './routes/file.routes.js';

 
app.set('trust proxy', 1);

app.use(cors());

// Configuring middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(logger('dev'));

// Configuring session
app.use(
  session({
    secret: process.env.SESS_SECRET || 'your-default-secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 60000, // 60 * 1000 ms === 1 min
    },
  })
);

// Configuring routes
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/files', fileRoutes);

// export default app;