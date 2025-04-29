class Carrito {
    constructor() {
      this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
      this.initElements();
      this.initEvents();
      this.render();
    }
  
    initElements() {
      this.lista = document.querySelector('.carrito-lista');
      this.total = document.querySelector('.carrito-total');
      this.btnVaciar = document.querySelector('.carrito-vaciar');
      this.btnPagar = document.querySelector('.carrito-pagar');
    }
  
    initEvents() {
      this.btnVaciar.addEventListener('click', () => this.vaciar());
      this.btnPagar.addEventListener('click', () => this.pagar());
    }
  
    agregar(producto) {
      const item = this.carrito.find(p => p.id === producto.id);
      if (item) {
        item.cantidad += 1;
      } else {
        this.carrito.push({ ...producto, cantidad: 1 });
      }
      this.guardar();
    }
  
    eliminar(id) {
      this.carrito = this.carrito.filter(p => p.id !== id);
      this.guardar();
    }
  
    cambiarCantidad(id, cambio) {
      const item = this.carrito.find(p => p.id === id);
      if (!item) return;
  
      item.cantidad += cambio;
      if (item.cantidad <= 0) {
        this.eliminar(id);
      } else {
        this.guardar();
      }
    }
  
    vaciar() {
      if (this.carrito.length === 0) return;
      
      if (confirm("¿Estás seguro de vaciar el carrito?")) {
        this.carrito = [];
        this.guardar();
      }
    }
  
    pagar() {
      if (this.carrito.length === 0) {
        alert("El carrito está vacío");
        return;
      }
      
      if (confirm(`¿Confirmar compra por $${this.getTotal()}?`)) {
        alert("Compra realizada");
        this.carrito = [];
        this.guardar();
      }
    }
  
    getTotal() {
      return this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toLocaleString();
    }
  
    guardar() {
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      this.render();
    }
  
    render() {
      this.lista.innerHTML = '';
      
      if (this.carrito.length === 0) {
        this.lista.innerHTML = '<p class="carrito-vacio">El carrito está vacío</p>';
        this.total.textContent = '';
        return;
      }
    
      this.carrito.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'carrito-item';
        itemElement.innerHTML = `
          <div class="carrito-item-info">
            <strong>${item.nombre}</strong>
            <p>$${item.precio} c/u</p>
          </div>
          <div class="carrito-item-cantidad">
            <button class="cantidad-restar">−</button>
            <span>${item.cantidad}</span>
            <button class="cantidad-sumar">+</button>
          </div>
          <div class="carrito-item-info">
            <p>Subtotal: $${item.precio * item.cantidad}</p>
          </div>
          <div>
            <button class="carrito-item-eliminar">Eliminar</button>
          </div>
        `;
        this.lista.appendChild(itemElement);
    
        // Asignar eventos a los botones
        itemElement.querySelector('.cantidad-restar').addEventListener('click', () => this.cambiarCantidad(item.id, -1));
        itemElement.querySelector('.cantidad-sumar').addEventListener('click', () => this.cambiarCantidad(item.id, 1));
        itemElement.querySelector('.carrito-item-eliminar').addEventListener('click', () => this.eliminar(item.id));
      });
    
      this.total.textContent = `Total: $${this.getTotal()}`;
    }
  }
  
  // Exportar para uso en otros módulos
  export const carrito = new Carrito();