// Obtener el carrito desde localStorage o inicializar uno vacío
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Función para agregar productos al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Función para mostrar el carrito
function mostrarCarrito() {
    const carritoContenedor = document.querySelector('.carrito-contenedor');
    carritoContenedor.innerHTML = ''; // Limpiar el contenedor

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <h3>${producto.nombre}</h3>
            <p>Precio: $${producto.precio}</p>
            <button onclick="eliminarDelCarrito(${producto.id})">Eliminar</button>
        `;
        carritoContenedor.appendChild(item);
    });
}

// Función para eliminar productos del carrito
function eliminarDelCarrito(productoId) {
    carrito = carrito.filter(producto => producto.id !== productoId);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Inicializar el carrito al cargar la página
document.addEventListener('DOMContentLoaded', mostrarCarrito);
