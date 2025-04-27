// marimba.js
fetch('../db/instrumentos.json')
  .then(response => response.json())
  .then(data => {
    const contenedor = document.getElementById('contenedor-instrumentos');
    const marimbas = data.instrumentos.filter(instr => instr.categoria === 'tunkul');

    marimbas.forEach(instr => {
      const html = `
        <div class="instrumento">
          <img src="../img/${instr.imagen}" alt="${instr.nombre}">
          
          <h1>${instr.nombre}</h1>

          <div class="descripcion">
            ${instr.descripcion}
          </div>

          <div class="caracteristicas">
            ${instr.caracteristicas.map(caracteristica => `- ${caracteristica}<br>`).join('')}
          </div>

          <div class="marca">
            Marca: ${instr.marca}
          </div>

          <div class="precio">
            Precio: ${instr.precio}
          </div>

          <button class="comprar-btn">Comprar</button>
        </div>
      `;
      contenedor.innerHTML += html;
    });
  })
  .catch(error => console.error('Error cargando instrumentos:', error));
