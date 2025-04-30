import nodemailer from 'nodemailer';

// Configuración del transporte de correo
const transporter = nodemailer.createTransport({
  service: 'gmail', // Puedes usar otro servicio como Outlook, Yahoo, etc.
  auth: {
    user: 'marquitosfer09@gmail.com', // Reemplaza con tu correo
    pass: 'AAaa1100++' // Reemplaza con tu contraseña de aplicación
  }
});

// Función para enviar el correo
export async function enviarCorreo(destinatario, asunto, contenidoHTML) {
  try {
    const info = await transporter.sendMail({
      from: '"Instrumentos Chiapanecos" <marquitosfer09@gmail.com>', // Remitente
      to: destinatario, // Destinatario
      subject: asunto, // Asunto del correo
      html: contenidoHTML // Contenido en formato HTML
    });

    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
}