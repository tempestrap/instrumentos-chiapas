document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    // Recopilar los datos del formulario
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // Enviar los datos al servidor usando fetch
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password }) // Enviar datos como JSON
        });

        const result = await response.text(); // Leer respuesta del servidor
        console.log('Estado HTTP:', response.status); // Ver el código de estado
        console.log('Respuesta del servidor:', result); // Ver el mensaje completo

        if (response.ok) {
            // Registro exitoso
            alert('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
        } else {
            // Mostrar mensaje de error enviado por el servidor
            alert(`Error: ${result}`);
        }
    } catch (error) {
        console.error('Error en el fetch:', error); // Mostrar detalles del error en la consola
        alert('Ocurrió un problema al comunicarse con el servidor.');
    }
});
