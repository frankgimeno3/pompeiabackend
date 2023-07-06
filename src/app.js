// app.js
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
 
import cors from 'cors';
import session from 'express-session'
import cookieParser from 'cookie-parser'
import logger from 'morgan'



const app = express();
app.set('trust proxy', 1);

app.use(cors());
// Configurar middlewares
app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(logger("dev"));


// Configurar rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
 
app.use(
    session({
      secret: process.env.SESS_SECRET,
      resave: true,
      saveUninitialized: false,
      cookie: {
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 60000 // 60 * 1000 ms === 1 min
      }
    })
  );
export default app 