import express from 'express';
import { getUsuario } from '../controllers/usuarioControllers.js';

const router = express.Router();

// Cambiado a GET y usando getUsuario
router.get('/user', getUsuario); // Ahora responderá a GET /apl/user

export default router;