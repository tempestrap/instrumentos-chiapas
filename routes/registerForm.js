document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Evitar el comportamiento predeterminado del formulario

    // Recopilar los datos del formulario
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value.trim();

    try {
        // Enviar los datos al servidor usando fetch
        const response = await fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }) // Enviar datos como JSON
        });

        // Manejar la respuesta del servidor
        const result = await response.text();
        console.log('Resultado del servidor:', result); // Mostrar en consola para depuración

        if (response.ok) {
            // Registro exitoso
            alert('Registro exitoso. Revisa tu correo para verificar tu cuenta.');
        } else {
            // Mostrar error enviado por el servidor
            alert(`Error del servidor: ${result}`);
        }
    } catch (error) {
        console.error('Error en el fetch:', error); // Mostrar detalles del error en la consola
        alert('Ocurrió un problema durante el registro.');
    }
});
