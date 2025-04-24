
router.post('/', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      await pool.query('INSERT INTO Usuario (nombre_usuario, contraseña) VALUES (?, ?)', [username, password]);
      res.json({ message: "Registro exitoso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  });
  
  export default router;