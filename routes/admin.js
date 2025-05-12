document.addEventListener('DOMContentLoaded', async () => {
    const listaInstrumentos = document.getElementById('lista-instrumentos');
    const formAgregar = document.getElementById('form-agregar');
    const formEditar = document.getElementById('form-editar');
    const editarSection = document.getElementById('editar');
    const cancelarEditar = document.getElementById('cancelar-editar');

    // Cargar instrumentos
    async function cargarInstrumentos() {
    try {
        const response = await fetch('/instrumentos');
        if (!response.ok) {
            throw new Error('Error al cargar los instrumentos.');
        }

        const data = await response.json();
        console.log('Instrumentos cargados:', data);

        listaInstrumentos.innerHTML = ''; // Limpiar la lista
        for (const categoria in data.instrumentos) {
            const instrumentos = data.instrumentos[categoria];
            instrumentos.forEach(instrumento => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <p><strong>${instrumento.nombre}</strong></p>
                    <p>${instrumento.descripcion}</p>
                    <p>Precio: $${instrumento.precio}</p>
                    <p>Cantidad: ${instrumento.cantidad}</p>
                    <button data-id="${instrumento.id}" data-categoria="${categoria}" class="editar">Editar</button>
                    <button data-id="${instrumento.id}" data-categoria="${categoria}" class="eliminar">Eliminar</button>
                `;
                listaInstrumentos.appendChild(div);
            });
        }

        // Agregar eventos a los botones de eliminar
        document.querySelectorAll('.eliminar').forEach(button => {
            button.addEventListener('click', async (e) => {
                const id = e.target.getAttribute('data-id');
                const categoria = e.target.getAttribute('data-categoria');
                await eliminarInstrumento(categoria, id);
                cargarInstrumentos(); // Recargar la lista
            });
        });

        // Agregar eventos a los botones de editar
        document.querySelectorAll('.editar').forEach(button => {
            button.addEventListener('click', (e) => {
                const id = e.target.getAttribute('data-id');
                const categoria = e.target.getAttribute('data-categoria');
                mostrarFormularioEditar(categoria, id);
            });
        });
    } catch (error) {
        console.error('Error al cargar instrumentos:', error);
        alert('No se pudieron cargar los instrumentos. Por favor intenta más tarde.');
    }
}

    // Agregar instrumento
    formAgregar.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = document.getElementById('nombre').value.trim();
        const descripcion = document.getElementById('descripcion').value.trim();
        const categoria = document.getElementById('categoria').value.trim();
        const precio = parseFloat(document.getElementById('precio').value);
        const cantidad = parseInt(document.getElementById('cantidad').value, 10);

        const nuevoInstrumento = {
            id: Date.now(), // Generar un ID único
            nombre,
            descripcion,
            precio,
            cantidad
        };

        await fetch('/instrumentos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ categoria, instrumento: nuevoInstrumento })
        });

        cargarInstrumentos();
        formAgregar.reset();
    });

    // Eliminar instrumento
    async function eliminarInstrumento(categoria, id) {
        const response = await fetch(`/instrumentos/${categoria}/${id}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            alert('Error al eliminar el instrumento.');
        }
    }

    // Mostrar formulario de edición
    function mostrarFormularioEditar(categoria, id) {
        editarSection.style.display = 'block';

        // Obtener los datos del instrumento a editar
        fetch(`/instrumentos`)
            .then(response => response.json())
            .then(data => {
                const instrumento = data.instrumentos[categoria].find(i => i.id === parseInt(id, 10));
                document.getElementById('editar-id').value = id;
                document.getElementById('editar-nombre').value = instrumento.nombre;
                document.getElementById('editar-descripcion').value = instrumento.descripcion;
                document.getElementById('editar-categoria').value = categoria;
                document.getElementById('editar-precio').value = instrumento.precio;
                document.getElementById('editar-cantidad').value = instrumento.cantidad;
            });
    }

    // Guardar cambios en el instrumento
    formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();

        const id = document.getElementById('editar-id').value;
        const nombre = document.getElementById('editar-nombre').value.trim();
        const descripcion = document.getElementById('editar-descripcion').value.trim();
        const categoria = document.getElementById('editar-categoria').value.trim();
        const precio = parseFloat(document.getElementById('editar-precio').value);
        const cantidad = parseInt(document.getElementById('editar-cantidad').value, 10);

        const instrumentoEditado = {
            id: parseInt(id, 10),
            nombre,
            descripcion,
            precio,
            cantidad
        };

        const response = await fetch(`/instrumentos/${categoria}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ instrumento: instrumentoEditado })
        });

        if (!response.ok) {
            alert('Error al guardar los cambios.');
        }

        editarSection.style.display = 'none';
        cargarInstrumentos();
    });

    // Cancelar edición
    cancelarEditar.addEventListener('click', () => {
        editarSection.style.display = 'none';
    });

    cargarInstrumentos();
});