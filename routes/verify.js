import express from 'express';
import { readUsers, saveUsers } from '../utils/database.js';

const router = express.Router();

router.get('/:token', async (req, res) => {
    const { token } = req.params;

    let users = await readUsers();

    const user = users.find(user => user.token === token);
    if (!user) {
        return res.status(400).send('Token inválido o expirado.');
    }

    user.isVerified = true;
    user.token = ''; // Limpiar el token
    await saveUsers(users);

    res.send('Correo verificado exitosamente. Ahora puedes iniciar sesión.');
});

export default router;
