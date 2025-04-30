import express from 'express';
import { readUsers, saveUsers } from '../utils/database.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Leer usuarios
        let users = await readUsers();
        console.log('Usuarios obtenidos:', users); // Depuración

        // Verificar si el usuario o correo ya existen
        const userExists = users.find(user => 
            user.username.toLowerCase() === username.toLowerCase() || 
            user.email.toLowerCase() === email.toLowerCase()
        );

        if (userExists) {
            return res.status(400).send('El nombre de usuario o correo ya están en uso.');
        }

        // Crear un nuevo usuario sin generar token ni enviar correo
        const newUser = {
            username,
            password,
            email,
            rol: 'usuario',
            isVerified: true // Por defecto, ya está verificado
        };

        // Agregar el nuevo usuario a la base de datos
        users.push(newUser);
        await saveUsers(users);

        res.status(201).send('Usuario registrado exitosamente.');
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).send('Ocurrió un problema en el servidor.');
    }
});

export default router;
