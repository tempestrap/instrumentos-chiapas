import nodemailer from 'nodemailer';

// Enviar correo de verificación
export async function sendVerificationEmail(userEmail, token) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tuemail@gmail.com', // Reemplaza por tu correo
      pass: 'tucontraseña'       // Reemplaza por tu contraseña
    }
  });

  const mailOptions = {
    from: 'tuemail@gmail.com',
    to: userEmail,
    subject: 'Verificación de correo',
    text: `Haz clic en el siguiente enlace para verificar tu correo: http://localhost:${PORT}/verify/${token}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado exitosamente.');
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
}

