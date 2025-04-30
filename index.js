import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { PORT } from './config.js';
import morgan from 'morgan';
import cors from 'cors';

// Importar rutas
import compraRouter from './routes/compra.js';
import registerRoute from './routes/register.js';
import verifyRoute from './routes/verify.js';
import loginRoute from './routes/login.js'; // Nueva ruta de login

const app = express();

// Obtener __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors({
  origin: 'http://127.0.0.1:5500', // Permitir solicitudes desde Live Server
  methods: ['GET', 'POST'],        // Métodos permitidos
  credentials: true                // Opcional: incluir cookies si es necesario
}));
app.use(express.json()); // Para trabajar con JSON en las solicitudes
app.use(morgan('dev'));  // Para el registro de solicitudes HTTP
// Servir archivos estáticos desde la carpeta 'img'
app.use('/img', express.static(path.join(__dirname, 'img')));


// Servir archivos estáticos desde la carpeta 'view' y 'styles'
app.use(express.static(path.join(__dirname, 'view'))); // Para HTML y recursos dentro de 'view'
app.use('/styles', express.static(path.join(__dirname, 'styles'))); // Para estilos

// Rutas para las páginas principales
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'index.html')); // Página inicial
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'registro.html')); // Página de registro
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'view', 'login.html')); // Página de login
});

// Rutas de la API
app.use('/register', registerRoute); // Ruta para registro
app.use('/verify', verifyRoute);     // Ruta para verificación
app.use('/login', loginRoute);       // Ruta para inicio de sesión
app.use('/compra', compraRouter);    // Ruta para compras (si aplica)

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
