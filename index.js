document.addEventListener('DOMContentLoaded', () => {
    let total = 0;
    const carrito = [];
    const carritoList = document.getElementById('carrito-list');
    const totalPagar = document.getElementById('total-pagar');
    const vaciarCarritoButton = document.getElementById('vaciar-carrito');
    const comprarButton = document.getElementById('comprar');

    function agregarAlTotal(precio) {
        total += precio;
        totalPagar.textContent = `Total a Pagar: $${total.toFixed(2)}`;
        localStorage.setItem('total', total);
    }

    function agregarAlCarrito(nombre, precio) {
        carrito.push({ nombre, precio });
        localStorage.setItem('carrito', JSON.stringify(carrito));
        agregarAlTotal(precio);

        const li = document.createElement('li');
        li.textContent = `${nombre} - $${precio}`;

        
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'X';
        botonEliminar.classList.add('eliminar-producto');

        botonEliminar.addEventListener('click', () => {
            eliminarProducto(carrito.indexOf({ nombre, precio }));
        });

        li.appendChild(botonEliminar);

        carritoList.appendChild(li);

        mostrarAlerta(`${nombre} agregado al carrito`, 'success');
    }
    function vaciarCarrito() {
        return new Promise((resolve, reject) => {
            if (carrito.length > 0) {
                total = 0;
                totalPagar.textContent = 'Total a Pagar: $0';
                carrito.length = 0;
                carritoList.innerHTML = '';
                localStorage.removeItem('total');
                localStorage.removeItem('carrito');

                mostrarAlerta('Carrito vaciado', 'info');
                resolve();
            } else {
                mostrarAlerta('No hay productos en el carrito para vaciar', 'info');
                reject();
            }
        });
    }

    function eliminarProducto(index) {
        const productoEliminado = carrito.splice(index, 1)[0];
        total -= productoEliminado.precio;
        totalPagar.textContent = `Total a Pagar: $${total.toFixed(2)}`;
        localStorage.setItem('total', total);
        localStorage.setItem('carrito', JSON.stringify(carrito));

        actualizarVistaCarrito();

        mostrarAlerta(`${productoEliminado.nombre} eliminado del carrito`, 'warning');
    }

    function actualizarVistaCarrito() {
        carritoList.innerHTML = '';

        carrito.forEach((item) => {
            const li = document.createElement('li');
            li.textContent = `${item.nombre} - $${item.precio}`;

            const botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'X';
            botonEliminar.classList.add('eliminar-producto');

            botonEliminar.addEventListener('click', () => {
                eliminarProducto(carrito.indexOf(item));
            });

            li.appendChild(botonEliminar);
            carritoList.appendChild(li);
        });
    }

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

    vaciarCarritoButton.addEventListener('click', () => {
        vaciarCarrito()
            .then(() => {
                mostrarAlertaCompraExitosa();
            })
            .catch(() => {
            });
    });

    comprarButton.addEventListener('click', () => {
        if (carrito.length > 0) {
            vaciarCarrito()
                .then(() => {
                    mostrarAlertaCompraExitosa();
                })
                .catch(() => {
                });
        } else {
            mostrarAlerta('No hay productos en el carrito para comprar', 'info');
        }
    });

    function mostrarAlerta(mensaje, icono) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            icon: icono,
        });

        Toast.fire({
            title: mensaje,
        });
    }

    function mostrarAlertaCompraExitosa() {
        Swal.fire({
            icon: 'success',
            title: '¡Compra Exitosa!',
            text: 'Gracias por tu compra. Tu pedido está en camino.',
            confirmButtonColor: '#3085d6',
            confirmButtonText: 'OK',
        });
    }
});
