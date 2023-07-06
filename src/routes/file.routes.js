import express from 'express';
import { getFiles, getFileById, createFile, updateFile, deleteFile } from '../controllers/fileController.js';
import authenticateToken from '../middlewares/authenticateToken.js';

const router = express.Router();

// Rutas para obtener y modificar los datos de los usuarios
// router.get('/', authenticateToken, getFiles);
// router.get('/:id', authenticateToken, getFileById);
// router.post('/', authenticateToken, createFile);
// router.patch('/:id', authenticateToken, updateFile);
// router.delete('/:id', authenticateToken, deleteFile);

router.get('/', getFiles);
router.get('/:id', getFileById);
router.post('/', createFile);
router.patch('/:id', updateFile);
router.delete('/:id', deleteFile);

export default router;