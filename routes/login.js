import express from 'express';
import { readUsers } from '../utils/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Leer los usuarios desde la base de datos
        const users = await readUsers();

        // Buscar un usuario que coincida con username y password
        const user = users.find(user => 
            user.username.toLowerCase() === username.toLowerCase() && 
            user.password === password
        );

        if (!user) {
            return res.status(401).send('Credenciales incorrectas. Inténtalo nuevamente.');
        }

        // Si las credenciales son correctas, enviar una respuesta exitosa
        res.status(200).send(`Bienvenido, ${user.username}!`);
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).send('Ocurrió un problema en el servidor.');
    }
});

export default router;
