document.getElementById('compraForm').addEventListener('submit', async function(event) {
    event.preventDefault();
  
    // Recopilar los datos del formulario
    const nombre = document.getElementById('nombre').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const ciudad = document.getElementById('ciudad').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const codigoPostal = document.getElementById('codigoPostal').value.trim();
    const tarjeta = document.getElementById('tarjeta').value.trim();
    const fechaExpiracion = document.getElementById('fechaExpiracion').value.trim();
    const cvv = document.getElementById('cvv').value.trim();
    const correo = document.getElementById('correo').value.trim();
  
    // Validar los datos (puedes agregar más validaciones según sea necesario)
    if (!nombre || !direccion || !ciudad || !estado || !codigoPostal || !tarjeta || !fechaExpiracion || !cvv || !correo) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    try {
      // Simular el envío de los datos al servidor
      const response = await fetch('/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre,
          direccion,
          ciudad,
          estado,
          codigoPostal,
          tarjeta,
          fechaExpiracion,
          cvv,
          correo
        })
      });
  
      const result = await response.text();
      if (response.ok) {
        alert('Compra realizada con éxito. Revisa tu correo para más detalles.');
        localStorage.removeItem('carrito'); // Vaciar el carrito después de la compra
        window.location.href = 'bienvenida.html'; // Redirigir a la página de bienvenida
      } else {
        alert(`Error: ${result}`);
      }
    } catch (error) {
      console.error('Error en la compra:', error);
      alert('Ocurrió un problema al procesar la compra.');
    }
  });