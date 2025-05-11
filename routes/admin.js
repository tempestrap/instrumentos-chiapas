document.addEventListener('DOMContentLoaded', async () => {
    const listaInstrumentos = document.getElementById('lista-instrumentos');
    const agregarBtn = document.getElementById('agregar-instrumento');

    // Cargar instrumentos
    async function cargarInstrumentos() {
        const response = await fetch('/instrumentos');
        const data = await response.json();
        listaInstrumentos.innerHTML = JSON.stringify(data, null, 2); // Renderizar instrumentos
    }

    // Agregar instrumento
    agregarBtn.addEventListener('click', async () => {
        const nuevoInstrumento = {
            id: Date.now(),
            nombre: 'Nuevo Instrumento',
            descripcion: 'Descripción del instrumento',
            precio: '$0.00 MXN',
            cantidad: 1
        };
        await fetch('/instrumentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoria: 'guitarra', instrumento: nuevoInstrumento })
        });
        cargarInstrumentos();
    });

    cargarInstrumentos();
});