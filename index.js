let total = 0;
const carrito = []

function agregarAlTotal(precio){
    total += precio;
}

function mostrarCarrito(){
    if (carrito.length === 0){
        alert("El carrito esta vacio.");
    } else {
        let carritoString = "Productos en el carrito:\n"
        for (let i = 0; i < carrito.length; i++ ) {
            carritoString += `${carrito[i]}\n`
        }
        alert(carritoString);
    }
}

while (true) {
    const opcion = prompt(
      "¿Qué deseas comprar? (remera, pantalón, zapatos) \nEscribe 'carrito' para ver lo que has agregado o 'salir' para terminar la compra"
    );
  
    if (opcion === "salir") {
      break;
    } else if (opcion === "carrito") {
      mostrarCarrito();
    } else {
      let precio;
      switch (opcion) {
        case "remera":
          precio = 10;
          break;
        case "pantalon":
          precio = 20;
          break;
        case "zapatos":
          precio = 30;
          break;
        default:
          alert("Ese artículo no está disponible.");
          continue;
      }
      agregarAlTotal(precio);
      carrito.push(opcion);
      alert(`${opcion} agregado al carrito.`);
    }
  }

if (total > 0) {
    alert(`Total a pagar: $${total}`);
  } else {
    alert("No has comprado nada. ¡Hasta luego!");
  }
