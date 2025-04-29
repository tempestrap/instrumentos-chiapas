import express from 'express';
import crypto from 'crypto';
import { readUsers, saveUsers } from '../utils/database.js';
import { sendVerificationEmail } from '../utils/emailVerification.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Usar await para leer los usuarios
        let users = await readUsers();
        console.log('Usuarios obtenidos:', users); // Depuración

        const userExists = users.find(user => 
            user.username.toLowerCase() === username.toLowerCase() || 
            user.email.toLowerCase() === email.toLowerCase()
        );

        if (userExists) {
            return res.status(400).send('El nombre de usuario o correo ya están en uso.');
        }

        const token = crypto.randomBytes(32).toString('hex');

        const newUser = {
            username,
            password,
            email,
            rol: 'usuario',
            isVerified: false,
            token
        };

        users.push(newUser);
        await saveUsers(users);

        try {
            await sendVerificationEmail(email, token);
        } catch (emailError) {
            console.error('Error al enviar correo:', emailError);
            return res.status(500).send('Registro completado, pero ocurrió un problema al enviar el correo de verificación.');
        }

        res.status(201).send('Usuario registrado. Revisa tu correo para verificar tu cuenta.');
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).send('Ocurrió un problema en el servidor.');
    }
});


export default router;
