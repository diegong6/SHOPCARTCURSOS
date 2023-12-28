//CREO UN ARRAY PARA CONTENER LOS PRODUTOS EN EL CARRITO

let carrito = [];

function agregarCarrito(nombreproducto, precio) {
  const existingproducto = carrito.find((item) => item.name === nombreproducto);

  if (existingproducto) {
    existingproducto.cantidad++;
  } else {
    carrito.push({ name: nombreproducto, precio: precio, cantidad: 1 });
  }

  actualizarCarrito();
  //MUESTRA EL POPUP
  mostrarPopup(`"${nombreproducto}" agregado al carrito`);
}
//Creo una funcion para contener la informacion que voy tomando en el carrito actualizada
function actualizarCarrito() {
  const carritoContainer = document.getElementById("carrito");
  const totalContainer = document.getElementById("total");
  carritoContainer.innerHTML = "";

  let total = 0;

  carrito.forEach((item, index) => {
    const productoDiv = document.createElement("div");
    productoDiv.className =
      "producto" + (item.cantidad > 0 ? " producto-en-carrito" : "");
    productoDiv.style.marginBottom = "10px";

    const nameSpan = document.createElement("span");
    nameSpan.textContent = item.name;
    //almaceno en una variable la cantidad y le agrego para aumentar y disminuir.
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.value = item.cantidad;
    cantidadInput.min = 1;
    cantidadInput.className = "cantidad";
    cantidadInput.addEventListener("input", () =>
      actualizarCantidad(item.name, cantidadInput.value)
    );
    //almaceno en una variable el precio.
    const precioSpan = document.createElement("span");
    precioSpan.textContent = " $" + (item.precio * item.cantidad).toFixed(2);
    //creo el boton eliminar
    const botonEliminar = document.createElement("button");
    botonEliminar.textContent = "Eliminar";
    botonEliminar.className = "boton-eliminar";
    botonEliminar.addEventListener("click", () =>
      eliminarDelCarrito(item.name)
    );
    //Pongo todas las variables dentro de una variable principal.
    productoDiv.appendChild(nameSpan);
    productoDiv.appendChild(cantidadInput);
    productoDiv.appendChild(precioSpan);
    productoDiv.appendChild(botonEliminar);

    carritoContainer.appendChild(productoDiv);

    total += item.precio * item.cantidad;
  });

  totalContainer.textContent = "Total: $" + total.toFixed(2);
}
//creo una funcion para actualizar cantidades
function actualizarCantidad(nombreproducto, newcantidad) {
  const producto = carrito.find((item) => item.name === nombreproducto);
  producto.cantidad = parseInt(newcantidad);
  actualizarCarrito();
}
//Creo una funcion para eliminar los productos del carrito
function eliminarDelCarrito(nombreproducto) {
  carrito = carrito.filter((item) => item.name !== nombreproducto);
  actualizarCarrito();
}

//FUNCION DEL POPUP
function mostrarPopup(message) {
  const popup = document.getElementById("popup");
  popup.textContent = message;
  popup.style.display = "block";

  // Oculta el popup después de 3 segundos
  setTimeout(() => {
    popup.style.display = "none";
  }, 4000);
}

//PARA QUE APAREZCA FORMULARIO DE VALIDACION DE COMPRA

// Hace aparecer el formulario al clickear en el botón
function mostrarForm() {
  document.getElementById("Form").style.display = "flex";
}
// Funcion para completar la compra al hacer click
function CompletarCompra() {
  const mensaje = document.getElementById("mensaje");
  mensaje.style.display = "block";
  //Muestra una alerta y luego con setTimeout me redirije al index nuevamente
  window.alert("Compra realizada con éxito!");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 2000);
}

//BOTON SCROLL ARRIBA
//Tomo el button desde el html y lo guardo en una variable y le coloco un evento que al clickear redirige el scroll hacia la parte de arriba del index
const boton_arriba = document.getElementById("boton_arriba");
boton_arriba.style.display = "none";
boton_arriba.addEventListener("click", () => {
  window.scrollTo(0, 0);
});

window.onscroll = () => {
  add_boton_arriba();
};

//defino cuando debe mostrarse el boton up al hacer scroll en el eje Y
const add_boton_arriba = () => {
  if (window.scrollY < 20) {
    boton_arriba.classList.remove("boton_arriba-on");
    boton_arriba.style.display = "none";
  } else {
    boton_arriba.classList.add("boton_arriba-on");
    boton_arriba.style.display = "";
  }
};
