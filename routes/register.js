import express from 'express';
import crypto from 'crypto';
import { readUsers, saveUsers } from '../utils/database.js';
import { sendVerificationEmail } from '../utils/emailVerification.js';

const router = express.Router();

router.post('/', (req, res) => {
    try {
        const { username, password, email } = req.body;

        let users = readUsers();

        // Verificar si el usuario ya existe
        const userExists = users.find(user => user.username === username || user.email === email);
        if (userExists) {
            return res.status(400).send('El usuario o correo ya está registrado.');
        }

        // Generar un token
        const token = crypto.randomBytes(32).toString('hex');

        // Crear nuevo usuario
        const newUser = {
            username,
            password,
            email,
            rol: 'usuario',
            isVerified: false,
            token
        };

        // Guardar en la base de datos
        users.push(newUser);
        saveUsers(users);

        // Intentar enviar el correo de verificación
        try {
            sendVerificationEmail(email, token);
        } catch (emailError) {
            console.error('Error al enviar correo:', emailError);
            return res.status(500).send('El registro se completó, pero ocurrió un problema al enviar el correo de verificación.');
        }

        // Respuesta de éxito
        res.status(201).send('Usuario registrado. Revisa tu correo para verificar tu cuenta.');
    } catch (error) {
        console.error('Error interno del servidor:', error);
        res.status(500).send('Ocurrió un problema en el servidor.');
    }
});

export default router; // Exportar como ES Module
