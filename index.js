document.addEventListener('DOMContentLoaded', () => {
  let total = 0;
  const carrito = [];
  const carritoList = document.getElementById('carrito-list');
  const totalPagar = document.getElementById('total-pagar');
  const vaciarCarritoButton = document.getElementById('vaciar-carrito');

  function agregarAlTotal(precio) {
      total += precio;
      totalPagar.textContent = `Total a Pagar: $${total.toFixed(2)}`;

      // Guarda el total en el almacenamiento local (localStorage).
      localStorage.setItem('total', total);
  }

  function agregarAlCarrito(nombre, precio) {
      carrito.push({ nombre, precio });

      // Convierte el carrito a formato JSON y almacénalo en localStorage.
      localStorage.setItem('carrito', JSON.stringify(carrito));

      agregarAlTotal(precio);

      const li = document.createElement('li');
      li.textContent = `${nombre} - $${precio}`;
      carritoList.appendChild(li);
  }

  function vaciarCarrito() {
      // Vacía el carrito y actualiza la interfaz.
      total = 0;
      totalPagar.textContent = 'Total a Pagar: $0';
      carrito.length = 0;
      carritoList.innerHTML = '';

      // Limpia los datos en localStorage.
      localStorage.removeItem('total');
      localStorage.removeItem('carrito');
  }

  // Carga el carrito y el total desde localStorage al cargar la página.
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
      const carritoParseado = JSON.parse(carritoGuardado);
      carritoParseado.forEach((item) => {
          agregarAlCarrito(item.nombre, item.precio);
      });
  }

  const totalGuardado = localStorage.getItem('total');
  if (totalGuardado) {
      total = parseFloat(totalGuardado);
      totalPagar.textContent = `Total a Pagar: $${total.toFixed(2)}`;
  }

  const productos = document.querySelectorAll('.producto');
  productos.forEach((producto) => {
      producto.addEventListener('click', () => {
          const nombre = producto.getAttribute('data-nombre');
          const precio = parseFloat(producto.getAttribute('data-precio'));
          agregarAlCarrito(nombre, precio);
      });
  });

  // Agrega un evento para vaciar el carrito cuando se hace clic en el botón correspondiente.
  vaciarCarritoButton.addEventListener('click', () => {
      vaciarCarrito();
  });
});
