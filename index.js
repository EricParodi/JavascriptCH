let total = 0;
const carrito = [];

const carritoList = document.getElementById('carrito-list');
const totalPagar = document.getElementById('total-pagar');

function agregarAlTotal(precio) {
  total += precio;
  totalPagar.textContent = `Total a Pagar: $${total.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
}

function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  agregarAlTotal(precio);

  const li = document.createElement('li');
  li.textContent = `${nombre} - $${precio.toLocaleString('es-ES', { minimumFractionDigits: 2 })}`;
  carritoList.appendChild(li);
}


const productos = document.querySelectorAll('.producto');
productos.forEach((producto) => {
  producto.addEventListener('click', () => {
    const nombre = producto.getAttribute('data-nombre');
    const precio = parseFloat(producto.getAttribute('data-precio'));
    agregarAlCarrito(nombre, precio);
  });
});
