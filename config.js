import dotenv from 'dotenv';
dotenv.config();

export default {
  // ESTA ES PARA LOCAL!
  mongoURI: process.env.MONGODB_URI ,
  
  
  //esto es para el jwt, sino no te deja hacer /auth/login en el back
  secretKey: process.env.SECRET_JWT_KEY

  };