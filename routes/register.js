const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const { readUsers, saveUsers } = require('../utils/database'); // Utilidad para la base de datos
const { sendVerificationEmail } = require('../utils/emailVerification'); // Utilidad para correos

// Ruta de registro
router.post('/', (req, res) => {
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

    // Enviar correo de verificación
    sendVerificationEmail(email, token);

    res.status(201).send('Usuario registrado. Revisa tu correo para verificar la cuenta.');
});

module.exports = router;
