
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import morgan from 'morgan';

const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, 'view')));

app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html'));
});

app.get('/registro.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'registro.html'));
});

app.use(morgan('dev'));
app.use(express.json());


app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});