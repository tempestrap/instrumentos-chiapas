let allGuitarras = [];

document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
    .then(response => response.json())
    .then(data => {
      const guitarras = data.instrumentos.guitarra;
      allGuitarras = guitarras; // Guardar los datos para usarlos después
      console.log("Productos cargados:", guitarras);

      // Cargar las secciones
      loadFeaturedInstruments(guitarras.slice(0, 2));
      loadCollageInstruments(guitarras.slice(2, 5));
      loadAllInstruments(guitarras.slice(5));

      // Configurar los event listeners
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

  if (!allGuitarras || allGuitarras.length === 0) {
    console.error("Error: allGuitarras no contiene datos.");
    alert("No se encontraron productos para agregar al carrito.");
    return;
  }

  const producto = allGuitarras.find(g => g.id === numericId);
  if (!producto) {
    console.error(`Producto con ID ${numericId} no encontrado en allGuitarras.`);
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
 * @param {Array} featuredGuitars - Array de guitarras destacadas
 */
function loadFeaturedInstruments(featuredGuitars) {
  const featuredContainer = document.getElementById('destacados-guitarras');
  
  featuredGuitars.forEach((guitarra, index) => {
    const alignmentClass = index % 2 === 0 ? 'right-aligned' : 'left-aligned';
    const imageName = `Guitarra${index + 2}.png`;
    
    const featureDiv = document.createElement('div');
    featureDiv.className = `instrument-feature ${alignmentClass}`;
    
    featureDiv.innerHTML = `
      <div class="instrument-content">
        <h2>${guitarra.nombre}</h2>
        <p class="featured-description">${guitarra.descripcion}</p>
        <div class="featured-characteristics">
          ${guitarra.caracteristicas.slice(0, 3).map(caract => 
            `<span class="characteristic-bubble">${caract}</span>`
          ).join('')}
        </div>
        <div class="featured-buttons">
          <button class="buy-now-btn" data-id="${guitarra.id}" data-price="${guitarra.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora - ${guitarra.precio}
          </button>
          <button class="add-to-cart-btn secondary-button" data-id="${guitarra.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
      <div class="instrument-image">
        <img src="../img/${imageName}" alt="${guitarra.nombre}">
      </div>
    `;
    
    featuredContainer.appendChild(featureDiv);
  });
}

/**
 * Carga los instrumentos del collage (segunda sección)
 * @param {Array} guitarras - Array de guitarras para el collage
 */
function loadCollageInstruments(guitarras) {
  const collageContainer = document.querySelector('.collage-container');

  guitarras.forEach((guitarra, index) => {
    const collageItem = document.createElement('div');
    collageItem.className = 'collage-item';
    collageItem.innerHTML = `
      <img src="../img/Guitarra${index + 4}.png" alt="${guitarra.nombre}" class="collage-img">
      <h3 class="collage-title">${guitarra.nombre}</h3>
      <p class="collage-description">${guitarra.descripcion}</p>
      <div class="collage-price">${guitarra.precio}</div>
      <div class="collage-buttons">
        <button class="buy-now-btn" data-id="${guitarra.id}" data-price="${guitarra.precio.replace(/[^0-9.]/g, '')}">
          Comprar ahora
        </button>
        <button class="add-to-cart-btn" data-id="${guitarra.id}">
          Agregar al carrito
        </button>
      </div>
    `;
    collageContainer.appendChild(collageItem);
  });
}

/**
 * Carga todos los instrumentos (tercera sección)
 * @param {Array} guitarras - Array de todas las guitarras restantes
 */
function loadAllInstruments(guitarras) {
  const contenedor = document.getElementById('contenedor-instrumentos');

  guitarras.forEach(guitarra => {
    const guitarraDiv = document.createElement('div');
    guitarraDiv.className = 'instrumento';
    
    guitarraDiv.innerHTML = `
      <div class="instrumento-imagen" style="background-image: url('../img/guitarra-${guitarra.id}.jpg')"></div>
      <h3>${guitarra.nombre}</h3>
      <div class="descripcion">${guitarra.descripcion}</div>
      <div class="caracteristicas">
        ${guitarra.caracteristicas.map(caracteristica => 
          `<p>• ${caracteristica}</p>`
        ).join('')}
      </div>
      <div class="marca">Marca: ${guitarra.marca}</div>
      <div class="precio-y-boton">
        <span class="precio-instrumento">${guitarra.precio}</span>
        <div class="instrument-buttons">
          <button class="buy-now-btn" data-id="${guitarra.id}" data-price="${guitarra.precio.replace(/[^0-9.]/g, '')}">
            Comprar ahora
          </button>
          <button class="add-to-cart-btn comprar-btn" data-id="${guitarra.id}">
            Agregar al carrito
          </button>
        </div>
      </div>
    `;
    
    contenedor.appendChild(guitarraDiv);
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