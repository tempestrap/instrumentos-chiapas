import express from 'express';
import { readUsers, saveUsers } from '../utils/database.js';

const router = express.Router();

router.get('/:token', (req, res) => {
    const { token } = req.params;

    let users = readUsers();

    const user = users.find(user => user.token === token);
    if (!user) {
        return res.status(400).send('Token inválido o expirado.');
    }

    user.isVerified = true;
    user.token = ''; // Limpiar el token
    saveUsers(users);

    res.send('Correo verificado exitosamente. Ahora puedes iniciar sesión.');
});

export default router; // Exportar como ES Module
