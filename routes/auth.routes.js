// routes/authRoutes.js
import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Rutas para registrarse e iniciar sesión
router.post('/register', register);
router.post('/login', login);
router.post('/logout', (req, res) => {
    try {
    res.status(200).json({ message: 'Sesión cerrada' });
}   catch (error){
    res.status(404).json({message: 'No se pudo cerrar sesión por este error:', error})
}
  });
  
export default router;