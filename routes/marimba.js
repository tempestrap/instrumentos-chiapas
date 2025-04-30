let allMarimbas = [];
/**
 * Carga y muestra los instrumentos musicales desde el JSON
 */
document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
    .then(response => response.json())
    .then(data => {
      const marimbas = data.instrumentos.marimba;
      allMarimbas = marimbas; // <- Guarda los datos para usar después
      console.log("Productos cargados:", marimbas);
      
      // Carga las secciones en orden
      loadFeaturedInstruments(marimbas.slice(0, 2)); // Primeras 2 (destacados)
      loadCollageInstruments(marimbas.slice(2, 5)); // Siguientes 3 (collage)
      loadAllInstruments(marimbas.slice(5)); // El resto
      
      // Agrega event listeners a los botones después de cargar todo
      setupEventListeners();
    })
    .catch(error => {
      console.error('Error al cargar instrumentos:', error);
      alert('No se pudieron cargar los productos. Por favor intenta más tarde.');
    });
});

/**
 * Carga los instrumentos destacados (primera sección)
 * @param {Array} featuredMarimbas - Array de marimbas destacadas
 */
function loadFeaturedInstruments(featuredMarimbas) {
  const featuredContainer = document.getElementById('destacados-guitarras');
  
  featuredMarimbas.forEach((marimba, index) => {
    const alignmentClass = index % 2 === 0 ? 'right-aligned' : 'left-aligned';
    const imageName = `Marimba${index + 2}.png`;
    
    const featureDiv = document.createElement('div');
    featureDiv.className = `instrument-feature ${alignmentClass}`;
    
    featureDiv.innerHTML = `
      <div class="instrument-content">
        <h2>${marimba.nombre}</h2>
        <p class="featured-description">${marimba.descripcion}</p>
        <div class="featured-characteristics">
          ${marimba.caracteristicas.slice(0, 3).map(caract => 
            `<span class="characteristic-bubble">${caract}</span>`
          ).join('')}
        </div>
        <div class="featured-buttons">
          <button class="buy-now-btn" data-id="${marimba.id}" data-price="${marimba.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora - ${marimba.precio}
          </button>
          <button class="add-to-cart-btn secondary-button" data-id="${marimba.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
      <div class="instrument-image">
        <img src="../img/${imageName}" alt="${marimba.nombre}">
      </div>
    `;
    
    featuredContainer.appendChild(featureDiv);
  });
}

/**
 * Carga los instrumentos del collage (segunda sección)
 * @param {Array} marimbas - Array de marimbas para el collage
 */
function loadCollageInstruments(marimbas) {
  const collageContainer = document.querySelector('.collage-container');

  marimbas.forEach((marimba, index) => {
    const collageItem = document.createElement('div');
    collageItem.className = 'collage-item';
    collageItem.innerHTML = `
      <img src="../img/Marimba${index + 4}.png" alt="${marimba.nombre}" class="collage-img">
      <h3 class="collage-title">${marimba.nombre}</h3>
      <p class="collage-description">${marimba.descripcion}</p>
      <div class="collage-price">${marimba.precio}</div>
      <div class="collage-buttons">
        <button class="buy-now-btn" data-id="${marimba.id}" data-price="${marimba.precio.replace(/[^0-9.]/g, '')}">
          Comprar ahora
        </button>
        <button class="add-to-cart-btn" data-id="${marimba.id}">
          Agregar al carrito
        </button>
      </div>
    `;
    collageContainer.appendChild(collageItem);
  });
}

/**
 * Carga todos los instrumentos (tercera sección)
 * @param {Array} marimbas - Array de todas las marimbas restantes
 */
function loadAllInstruments(marimbas) {
  const contenedor = document.getElementById('contenedor-instrumentos');

  marimbas.forEach(marimba => {
    const marimbaDiv = document.createElement('div');
    marimbaDiv.className = 'instrumento';
    
    marimbaDiv.innerHTML = `
      <div class="instrumento-imagen" style="background-image: url('../img/marimba-${marimba.id}.jpg')"></div>
      <h3>${marimba.nombre}</h3>
      <div class="descripcion">${marimba.descripcion}</div>
      <div class="caracteristicas">
        ${marimba.caracteristicas.map(caracteristica => 
          `<p>• ${caracteristica}</p>`
        ).join('')}
      </div>
      <div class="marca">Marca: ${marimba.marca}</div>
      <div class="precio-y-boton">
        <span class="precio-instrumento">${marimba.precio}</span>
        <div class="instrument-buttons">
          <button class="buy-now-btn" data-id="${marimba.id}" data-price="${marimba.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora
          </button>
          <button class="add-to-cart-btn comprar-btn" data-id="${marimba.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
    
    contenedor.appendChild(marimbaDiv);
  });
}

/**
 * Configura los event listeners para los botones
 */
function setupEventListeners() {
  // Event listeners para botones "Comprar ahora"
  document.querySelectorAll('.buy-now-btn').forEach(button => {
    button.addEventListener('click', function() {
      const price = this.getAttribute('data-price');
      const productId = this.getAttribute('data-id');
      buyNow(productId, price);
    });
  });

  // Event listeners para botones "Agregar al carrito"
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

/**
 * Función para manejar la compra inmediata
 * @param {string} productId - ID del producto
 * @param {string} price - Precio del producto
 */
function buyNow(productId, price) {
  localStorage.setItem('productoSeleccionado', JSON.stringify({ productId, price }));
  window.location.href = '../view/compra.html';
}

/**
 * Función para agregar un producto al carrito
 * @param {string} productId - ID del producto
 */
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('carrito')) || [];

  // Convertir productId a número
  const numericId = parseInt(productId, 10);

  // Verificar que allMarimbas tenga datos
  if (!allMarimbas || allMarimbas.length === 0) {
    console.error("Error: allMarimbas no contiene datos.");
    alert("No se encontraron productos para agregar al carrito.");
    return;
  }

  // Buscar el producto en allMarimbas
  const producto = allMarimbas.find(m => m.id === numericId);
  if (!producto) {
    console.error(`Producto con ID ${numericId} no encontrado en allMarimbas.`);
    alert('Producto no encontrado');
    return;
  }

  // Verificar si el producto ya está en el carrito
  const existing = cart.find(item => item.id === producto.id);
  if (existing) {
    existing.cantidad += 1;
  } else {
    cart.push({
      id: producto.id,
      nombre: producto.nombre,
      precio: parseFloat(producto.precio.replace(/[^0-9.]/g, '')),
      cantidad: 1
    });
  }

  // Guardar el carrito actualizado en localStorage
  localStorage.setItem('carrito', JSON.stringify(cart));
  alert(`Producto "${producto.nombre}" agregado al carrito`);
  console.log("Carrito actualizado:", cart);
}



/**
 * Función para manejar errores
 * @param {Error} error - Objeto de error
 */
function handleError(error) {
  console.error('Error:', error);
  alert('Ocurrió un error. Por favor intenta nuevamente.');
}