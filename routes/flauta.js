let allFlautas = [];

document.addEventListener('DOMContentLoaded', function() {
  fetch('/db/instrumentos.json')
  .then(response => response.json())
  .then(data => {
    const flautas = data.instrumentos.flauta;

    if (!Array.isArray(flautas)) {
      console.error('La categoría "flauta" no existe o no es un array.');
      alert('No se encontraron productos en la categoría "flauta".');
      return;
    }

    allFlautas = flautas;
    console.log("Productos cargados:", flautas);

    loadFeaturedInstruments(flautas.slice(0, 2));
    loadCollageInstruments(flautas.slice(2, 5));
    loadAllInstruments(flautas.slice(5));

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

  if (!allFlautas || allFlautas.length === 0) {
    console.error("Error: allFlautas no contiene datos.");
    alert("No se encontraron productos para agregar al carrito.");
    return;
  }

  const producto = allFlautas.find(f => f.id === numericId);
  if (!producto) {
    console.error(`Producto con ID ${numericId} no encontrado en allFlautas.`);
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
 * @param {Array} featuredFlautas - Array de flautas destacadas
 */
function loadFeaturedInstruments(featuredFlautas) {
    if (!featuredFlautas || featuredFlautas.length === 0) {
        console.error('No hay flautas destacadas para mostrar.');
        const featuredContainer = document.getElementById('destacados-guitarras');
        featuredContainer.innerHTML = '<p>No hay flautas destacadas disponibles.</p>';
        return;
    }

    const featuredContainer = document.getElementById('destacados-guitarras');
    featuredFlautas.forEach((flauta, index) => {
        const alignmentClass = index % 2 === 0 ? 'right-aligned' : 'left-aligned';
        const imageName = `flauta${index + 2}.png`;

        const featureDiv = document.createElement('div');
        featureDiv.className = `instrument-feature ${alignmentClass}`;

        featureDiv.innerHTML = `
            <div class="instrument-content">
                <h2>${flauta.nombre}</h2>
                <p class="featured-description">${flauta.descripcion}</p>
                <div class="featured-characteristics">
                    ${flauta.caracteristicas?.slice(0, 3).map(caract => 
                        `<span class="characteristic-bubble">${caract}</span>`
                    ).join('') || ''}
                </div>
                <div class="featured-buttons">
                    <button class="buy-now-btn" data-id="${flauta.id}" data-price="${flauta.precio}">
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
      <img src="../img/flauta${index + 4}.png" alt="${flauta.nombre}" class="collage-img">
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
      <div class="instrumento-imagen" style="background-image: url('../img/flauta${flauta.id}.jpg')"></div>
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