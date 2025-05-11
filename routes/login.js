import express from 'express';
import { readUsers } from '../utils/database.js'; // Función para leer usuarios desde la base de datos

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        console.log('Datos recibidos:', req.body);

        const { username, password } = req.body;
        const users = await readUsers();

        console.log('Usuarios en la base de datos:', users);

        const user = users.find(user => 
            user.username.toLowerCase() === username.toLowerCase().trim() && 
            user.password === password.trim()
        );

        if (!user) {
            console.log('Usuario no encontrado o credenciales incorrectas.');
            return res.status(401).json({ error: 'Credenciales incorrectas. Inténtalo nuevamente.' });
        }

        if (user.rol === 'admin') {
            return res.status(200).json({ 
                message: `Bienvenido, ${user.username}!`, 
                redirect: '/view/admin.html'
            });
        }

        return res.status(200).json({ 
            message: `Bienvenido, ${user.username}!`, 
            redirect: '/view/bienvenida.html'
        });
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).json({ error: 'Ocurrió un problema en el servidor.' });
    }
});

export default router;