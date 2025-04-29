const express = require('express');
const router = express.Router();
const { readUsers, saveUsers } = require('../utils/database');

// Ruta de verificación
router.get('/:token', (req, res) => {
    const { token } = req.params;

    let users = readUsers();

    const user = users.find(user => user.token === token);
    if (!user) {
        return res.status(400).send('Token inválido o expirado.');
    }

    user.isVerified = true;
    user.token = ''; // Limpiar el token para evitar reutilización
    saveUsers(users);

    res.send('Correo verificado exitosamente. Ahora puedes iniciar sesión.');
});

module.exports = router;
