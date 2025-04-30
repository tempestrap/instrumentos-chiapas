import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import morgan from 'morgan';
import cors from 'cors';
import compraRouter from './routes/compra.js';

// Importar rutas de registro y verificación
import registerRoute from './routes/register.js';
import verifyRoute from './routes/verify.js';

const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors()); // Habilitar CORS para solicitudes desde diferentes orígenes
app.use(express.json()); // Para trabajar con JSON en las solicitudes
app.use(morgan('dev')); // Para el registro de solicitudes HTTP

// Servir archivos estáticos desde la carpeta 'view' y 'styles'
app.use(express.static(path.join(__dirname, 'view'))); // Para HTML y recursos dentro de 'view'
app.use('/styles', express.static(path.join(__dirname, 'styles'))); // Para la carpeta de estilos

// Rutas para las páginas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html')); // Página inicial
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'registro.html')); // Registro
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html')); // Inicio de sesión
});

// Rutas de la API
app.use('/register', registerRoute); // Ruta para registro
app.use('/verify', verifyRoute);     // Ruta para verificación de correos
app.use('/compra', compraRouter);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
