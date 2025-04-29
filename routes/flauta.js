/**
 * Carga y muestra los instrumentos musicales (flautas) desde el JSON
 */
document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
    .then(response => response.json())
    .then(data => {
      const flautas = data.instrumentos.flauta;
      
      // Carga las secciones en orden
      loadFeaturedInstruments(flautas.slice(0, 2)); // Primeras 2 (destacados)
      loadCollageInstruments(flautas.slice(2, 5)); // Siguientes 3 (collage)
      loadAllInstruments(flautas.slice(5)); // El resto
      
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
 * @param {Array} featuredFlautas - Array de flautas destacadas
 */
function loadFeaturedInstruments(featuredFlautas) {
  const featuredContainer = document.getElementById('destacados-guitarras'); // Considera cambiar este ID
  
  featuredFlautas.forEach((flauta, index) => {
    const alignmentClass = index % 2 === 0 ? 'right-aligned' : 'left-aligned';
    const imageName = `Flauta${index + 2}.png`; // Asume nombres como Flauta1.png, Flauta2.png
    
    const featureDiv = document.createElement('div');
    featureDiv.className = `instrument-feature ${alignmentClass}`;
    
    featureDiv.innerHTML = `
      <div class="instrument-content">
        <h2>${flauta.nombre}</h2>
        <p class="featured-description">${flauta.descripcion}</p>
        <div class="featured-characteristics">
          ${flauta.caracteristicas.slice(0, 3).map(caract => 
            `<span class="characteristic-bubble">${caract}</span>`
          ).join('')}
        </div>
        <div class="featured-buttons">
          <button class="buy-now-btn" data-id="${flauta.id}" data-price="${flauta.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora - ${flauta.precio}
          </button>
          <button class="add-to-cart-btn secondary-button" data-id="${flauta.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
      <div class="instrument-image">
        <img src="../img/${imageName}" alt="${flauta.nombre}">
      </div>
    `;
    
    featuredContainer.appendChild(featureDiv);
  });
}

/**
 * Carga los instrumentos del collage (segunda sección)
 * @param {Array} flautas - Array de flautas para el collage
 */
function loadCollageInstruments(flautas) {
  const collageContainer = document.querySelector('.collage-container');

  flautas.forEach((flauta, index) => {
    const collageItem = document.createElement('div');
    collageItem.className = 'collage-item';
    collageItem.innerHTML = `
      <img src="../img/Flauta${index + 4}.png" alt="${flauta.nombre}" class="collage-img">
      <h3 class="collage-title">${flauta.nombre}</h3>
      <p class="collage-description">${flauta.descripcion}</p>
      <div class="collage-price">${flauta.precio}</div>
      <div class="collage-buttons">
        <button class="buy-now-btn" data-id="${flauta.id}" data-price="${flauta.precio.replace(/[^0-9.]/g, '')}">
          Comprar ahora
        </button>
        <button class="add-to-cart-btn" data-id="${flauta.id}">
          Agregar al carrito
        </button>
      </div>
    `;
    collageContainer.appendChild(collageItem);
  });
}

/**
 * Carga todos los instrumentos (tercera sección)
 * @param {Array} flautas - Array de todas las flautas restantes
 */
function loadAllInstruments(flautas) {
  const contenedor = document.getElementById('contenedor-instrumentos');

  flautas.forEach(flauta => {
    const flautaDiv = document.createElement('div');
    flautaDiv.className = 'instrumento';
    
    flautaDiv.innerHTML = `
      <div class="instrumento-imagen" style="background-image: url('../img/flauta-${flauta.id}.jpg')"></div>
      <h3>${flauta.nombre}</h3>
      <div class="descripcion">${flauta.descripcion}</div>
      <div class="caracteristicas">
        ${flauta.caracteristicas.map(caracteristica => 
          `<p>• ${caracteristica}</p>`
        ).join('')}
      </div>
      <div class="marca">Marca: ${flauta.marca}</div>
      <div class="precio-y-boton">
        <span class="precio-instrumento">${flauta.precio}</span>
        <div class="instrument-buttons">
          <button class="buy-now-btn" data-id="${flauta.id}" data-price="${flauta.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora
          </button>
          <button class="add-to-cart-btn comprar-btn" data-id="${flauta.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
    
    contenedor.appendChild(flautaDiv);
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
  console.log(`Compra inmediata del producto ${productId} por $${price}`);
  // Aquí iría la lógica para redirigir al proceso de pago
  alert(`Redirigiendo al pago por el producto ${productId} - Total: $${price}`);
}

/**
 * Función para agregar un producto al carrito
 * @param {string} productId - ID del producto
 */
function addToCart(productId) {
  console.log(`Producto ${productId} agregado al carrito`);
  // Aquí iría la lógica para agregar al carrito
  alert(`Producto ${productId} agregado al carrito`);
}

/**
 * Función para manejar errores
 * @param {Error} error - Objeto de error
 */
function handleError(error) {
  console.error('Error:', error);
  alert('Ocurrió un error. Por favor intenta nuevamente.');
}