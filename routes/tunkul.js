document.addEventListener('DOMContentLoaded', function() {
  fetch('../db/instrumentos.json')
      .then(response => response.json())
      .then(data => {
          const contenedor = document.getElementById('contenedor-instrumentos');
          const instrumentos = data.instrumentos.tunkul;

          if (instrumentos && instrumentos.length > 0) {
              instrumentos.forEach(instr => {
                  const instrumentoDiv = document.createElement('div');
                  instrumentoDiv.className = 'instrumento';
                  
                  instrumentoDiv.innerHTML = `
                      <img src="../img/${instr.imagen}" alt="${instr.nombre}">
                      <h3>${instr.nombre}</h3>
                      <div class="descripcion">${instr.descripcion}</div>
                      <div class="caracteristicas">
                          ${instr.caracteristicas.map(caracteristica => 
                              `<p>• ${caracteristica}</p>`
                          ).join('')}
                      </div>
                      <div class="marca">Marca: ${instr.marca}</div>
                      <div class="precio">${instr.precio}</div>
                      <button class="comprar-btn">Comprar</button>
                  `;
                  
                  contenedor.appendChild(instrumentoDiv);
              });
          } else {
              contenedor.innerHTML = '<p>No se encontraron tunkules disponibles.</p>';
          }
      })
      .catch(error => {
          console.error('Error cargando tunkules:', error);
          document.getElementById('contenedor-instrumentos').innerHTML = 
              '<p>Error al cargar los tunkules. Por favor intente más tarde.</p>';
      });
});