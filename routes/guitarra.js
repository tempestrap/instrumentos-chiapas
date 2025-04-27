document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
      .then(response => response.json())
      .then(data => {
          const contenedor = document.getElementById('contenedor-instrumentos');
          const guitarras = data.instrumentos.guitarra; // Accedemos directamente a las guitarras

          // Verificar si hay guitarras
          if (guitarras && guitarras.length > 0) {
              guitarras.forEach(guitarra => {
                  const guitarraDiv = document.createElement('div');
                  guitarraDiv.className = 'instrumento';
                  
                  guitarraDiv.innerHTML = `
                      <img src="../img/${guitarra.imagen}" alt="${guitarra.nombre}">
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
          } else {
              contenedor.innerHTML = '<p>No se encontraron guitarras disponibles.</p>';
          }
      })
      .catch(error => {
          console.error('Error cargando instrumentos:', error);
          document.getElementById('contenedor-instrumentos').innerHTML = 
              '<p>Error al cargar los productos. Por favor intente más tarde.</p>';
      });
});