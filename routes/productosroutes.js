import express from 'express';
import { pool } from '../models/app.js';

const router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM Usuario WHERE nombre_usuario = ? AND contraseña = ?', 
      [username, password]
    );

    if (rows.length > 0) {
      res.json({ success: true, message: "Login exitoso" });
    } else {
      res.status(401).json({ success: false, message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

export default router;
