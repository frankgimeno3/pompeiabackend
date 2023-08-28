// index.js
// import app from "./app.js";
import connectDB from "./db.js";

const app = express();
 
// Conectarse a la base de datos de MongoDB
connectDB();

// Iniciar el servidor
app.listen(5000, () => {
  console.log("Servidor iniciado en el puerto 5000");
});

// app.js
import express from 'express';
import authRoutes from './routes/auth.routes.js';
import userRoutes from './routes/user.routes.js';
import fileRoutes from './routes/file.routes.js';
 
import cors from 'cors';
import session from 'cookie-session'
import cookieParser from 'cookie-parser'
import logger from 'morgan'

// app.js ............................................................................................


app.set('trust proxy', 1);

app.use(cors({
  origin: '*'
}));// Configurar middlewares
app.use(express.json());

  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(logger("dev"));


// Configurar rutas
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/files', fileRoutes);

app.use(
  session({
    secret: process.env.SESS_SECRET || 'defaultSecret', // Puedes reemplazar 'defaultSecret' con cualquier valor que desees
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
// export default app 