let allArpas = [];

document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
    .then(response => response.json())
    .then(data => {
      const arpas = data.instrumentos.arpa;
      allArpas = arpas;
      console.log("Productos cargados:", arpas);

      loadFeaturedInstruments(arpas.slice(0, 2));
      loadCollageInstruments(arpas.slice(2, 5));
      loadAllInstruments(arpas.slice(5));

      setupEventListeners();
    })
    .catch(error => {
      console.error('Error al cargar instrumentos:', error);
      alert('No se pudieron cargar los productos. Por favor intenta más tarde.');
    });
});

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem('carrito')) || [];
  const numericId = parseInt(productId, 10);

  if (!allArpas || allArpas.length === 0) {
    console.error("Error: allArpas no contiene datos.");
    alert("No se encontraron productos para agregar al carrito.");
    return;
  }

  const producto = allArpas.find(a => a.id === numericId);
  if (!producto) {
    console.error(`Producto con ID ${numericId} no encontrado en allArpas.`);
    alert('Producto no encontrado');
    return;
  }

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

  localStorage.setItem('carrito', JSON.stringify(cart));
  alert(`Producto "${producto.nombre}" agregado al carrito`);
  console.log("Carrito actualizado:", cart);
}

function setupEventListeners() {
  document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
      const productId = this.getAttribute('data-id');
      addToCart(productId);
    });
  });
}

/**
 * Carga los instrumentos destacados (primera sección)
 * @param {Array} featuredHarpas - Array de arpas destacadas
 */
function loadFeaturedInstruments(featuredHarpas) {
  const featuredContainer = document.getElementById('destacados-guitarras'); // Cambia este ID si es diferente
  
  featuredHarpas.forEach((arpa, index) => {
    const alignmentClass = index % 2 === 0 ? 'right-aligned' : 'left-aligned';
    const imageName = `arpa${index + 1}.png`; // Cambiado a convención similar a guitarras
    
    const featureDiv = document.createElement('div');
    featureDiv.className = `instrument-feature ${alignmentClass}`;
    
    featureDiv.innerHTML = `
      <div class="instrument-content">
        <h2>${arpa.nombre}</h2>
        <p class="featured-description">${arpa.descripcion}</p>
        <div class="featured-characteristics">
          ${arpa.caracteristicas.slice(0, 3).map(caract => 
            `<span class="characteristic-bubble">${caract}</span>`
          ).join('')}
        </div>
        <div class="featured-buttons">
          <button class="buy-now-btn" data-id="${arpa.id}" data-price="${arpa.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora - ${arpa.precio}
          </button>
          <button class="add-to-cart-btn secondary-button" data-id="${arpa.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
      <div class="instrument-image">
        <img src="../img/${imageName}" alt="${arpa.nombre}">
      </div>
    `;
    
    featuredContainer.appendChild(featureDiv);
  });
}

/**
 * Carga los instrumentos del collage (segunda sección)
 * @param {Array} arpas - Array de arpas para el collage
 */
function loadCollageInstruments(arpas) {
  const collageContainer = document.querySelector('.collage-container');

  arpas.forEach((arpa, index) => {
    const collageItem = document.createElement('div');
    collageItem.className = 'collage-item';
    collageItem.innerHTML = `
      <img src="../img/arpa${index + 2}.png" alt="${arpa.nombre}" class="collage-img">
      <h3 class="collage-title">${arpa.nombre}</h3>
      <p class="collage-description">${arpa.descripcion}</p>
      <div class="collage-price">${arpa.precio}</div>
      <div class="collage-buttons">
        <button class="buy-now-btn" data-id="${arpa.id}" data-price="${arpa.precio.replace(/[^0-9.]/g, '')}">
          Comprar ahora
        </button>
        <button class="add-to-cart-btn" data-id="${arpa.id}">
          Agregar al carrito
        </button>
      </div>
    `;
    collageContainer.appendChild(collageItem);
  });
}

/**
 * Carga todos los instrumentos (tercera sección)
 * @param {Array} arpas - Array de todas las arpas restantes
 */
function loadAllInstruments(arpas) {
  const contenedor = document.getElementById('contenedor-instrumentos');

  arpas.forEach(arpa => {
    const arpaDiv = document.createElement('div');
    arpaDiv.className = 'instrumento';
    
    arpaDiv.innerHTML = `
      <div class="instrumento-imagen" style="background-image: url('../img/arpa${arpa.id}.png')"></div>
      <h3>${arpa.nombre}</h3>
      <div class="descripcion">${arpa.descripcion}</div>
      <div class="caracteristicas">
        ${arpa.caracteristicas.map(caracteristica => 
          `<p>• ${caracteristica}</p>`
        ).join('')}
      </div>
      <div class="marca">Marca: ${arpa.marca}</div>
      <div class="precio-y-boton">
        <span class="precio-instrumento">${arpa.precio}</span>
        <div class="instrument-buttons">
          <button class="buy-now-btn" data-id="${arpa.id}" data-price="${arpa.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora
          </button>
          <button class="add-to-cart-btn comprar-btn" data-id="${arpa.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
    
    contenedor.appendChild(arpaDiv);
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
 * Función para manejar errores
 * @param {Error} error - Objeto de error
 */
function handleError(error) {
  console.error('Error:', error);
  alert('Ocurrió un error. Por favor intenta nuevamente.');
}