document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
    .then(response => response.json())
    .then(data => {
      const guitarras = data.instrumentos.guitarra;
      
      loadFeaturedInstruments(guitarras.slice(0, 2)); // Primeras 2 (destacados)
      loadCollageInstruments(guitarras); // Siguientes 3 (collage)
      loadAllInstruments(guitarras.slice(5)); // El resto
    })
    .catch(handleError);
});

function loadFeaturedInstruments(featuredGuitars) {
  const featuredContainer = document.getElementById('destacados-guitarras');
  
  featuredGuitars.forEach((guitarra, index) => {
    const alignmentClass = index % 2 === 0 ? 'right-aligned' : 'left-aligned';
    const imageName = `Guitarra${index + 2}.png`; // Usa Guitarra2.png y Guitarra3.png
    
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
        <button class="secondary-button">Ver detalles</button>
      </div>
      <div class="instrument-image">
        <img src="../img/${imageName}" alt="${guitarra.nombre}">
      </div>
    `;
    
    featuredContainer.appendChild(featureDiv);
  });
}

function loadCollageInstruments(guitarras) {
  const collageContainer = document.querySelector('.collage-container');
  const collageGuitars = guitarras.slice(2, 5); // Tomamos las guitarras 3, 4 y 5

  collageGuitars.forEach((guitarra, index) => {
    const collageItem = document.createElement('div');
    collageItem.className = 'collage-item';
    collageItem.innerHTML = `
      <img src="../img/Guitarra${index + 4}.png" alt="${guitarra.nombre}" class="collage-img">
      <h3 class="collage-title">${guitarra.nombre}</h3>
      <p class="collage-description">${guitarra.descripcion}</p>
      <div class="collage-price">${guitarra.precio}</div>
    `;
    collageContainer.appendChild(collageItem);
  });
}

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
      <div class="precio">${guitarra.precio}</div>
      <button class="comprar-btn">Comprar</button>
    `;
    
    contenedor.appendChild(guitarraDiv);
  });
}