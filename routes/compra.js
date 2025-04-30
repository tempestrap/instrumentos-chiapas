import express from 'express';
import nodemailer from 'nodemailer';

const router = express.Router();

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'marquitosfer09@gmail.com', // Reemplaza con tu correo
    pass: 'AAaa1100++'       // Reemplaza con tu contraseña de aplicación
  }
});

// Función para enviar el correo con el ticket
async function enviarTicketCorreo(destinatario, asunto, contenidoHTML) {
  const mailOptions = {
    from: 'marquitosfer09@gmail.com',
    to: destinatario,
    subject: asunto,
    html: contenidoHTML
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente.');
  } catch (error) {
    console.error('Error al enviar correo:', error);
    throw new Error('Error al enviar el ticket de compra.');
  }
}

// Ruta para procesar la compra
router.post('/', async (req, res) => {
  const { nombre, direccion, ciudad, estado, codigoPostal, correo, productos } = req.body;

  try {
    // Calcular el precio total
    const total = productos.reduce((sum, producto) => sum + producto.precio * producto.cantidad, 0);

    // Generar el contenido del ticket
    const fecha = new Date();
    const ticketHTML = `
      <h1>Gracias por tu compra, ${nombre}!</h1>
      <p><strong>Fecha:</strong> ${fecha.toLocaleDateString()} ${fecha.toLocaleTimeString()}</p>
      <p><strong>Dirección de envío:</strong> ${direccion}, ${ciudad}, ${estado}, ${codigoPostal}</p>
      <h2>Detalles de la compra:</h2>
      <ul>
        ${productos.map(producto => `
          <li>${producto.nombre} - ${producto.cantidad} x $${producto.precio.toFixed(2)}</li>
        `).join('')}
      </ul>
      <h3>Total: $${total.toFixed(2)}</h3>
      <p>¡Esperamos que disfrutes tus instrumentos!</p>
    `;

    // Enviar el ticket por correo
    await enviarTicketCorreo(correo, 'Tu ticket de compra - Instrumentos Chiapanecos', ticketHTML);

    // Responder al cliente
    res.status(200).send('Compra procesada con éxito. Revisa tu correo para más detalles.');
  } catch (error) {
    console.error('Error al procesar la compra:', error);
    res.status(500).send('Ocurrió un problema al procesar la compra.');
  }
});

export default router;