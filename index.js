
var usuario = {
    nombre: "",
    registrado: false
};

function mostrarInfoUsuario() {
    var usuarioInfo = document.getElementById('usuarioInfo');
    if (usuario.registrado) {
        usuarioInfo.innerHTML = `Bienvenido, ${usuario.nombre} | <a id=usuarioInfo1 href="#" onclick="cerrarSesion()">Cerrar sesión</a>`;
    } else {
        usuarioInfo.innerHTML = `<a id=usuarioInfo href="#" onclick="iniciarSesion()">Iniciar sesión</a>`;
    }
}

mostrarInfoUsuario();

function iniciarSesion() {
    var nombreUsuario = prompt("Ingrese su nombre de usuario:");
    var contraseña = prompt("Ingrese su contraseña:");
    if (nombreUsuario) {
        usuario.nombre = nombreUsuario;
        usuario.registrado = true;
        mostrarInfoUsuario();

        
    console.log(`Usuario ${nombreUsuario} registrado.`);
    }
}

function cerrarSesion() {
    usuario.nombre = "";
    usuario.registrado = false;
    mostrarInfoUsuario();
}

var productosEnCarrito = [];

function agregarAlCarrito(nombreProducto, precioProducto) {
    if (!usuario.registrado) {
        alert("Debe iniciar sesión para agregar productos al carrito.");
        return;
    }

    var producto = {
        nombre: nombreProducto,
        precio: precioProducto
    }

    productosEnCarrito.push(producto);
    actualizarCarrito();

    console.log(`Producto agregado al carrito: ${nombreProducto}`);
}

function actualizarCarrito() {
    var listaCarrito = document.getElementById('listaCarrito');
    var totalCarrito = document.getElementById('totalCarrito');
    

    listaCarrito.innerHTML = "";
    var total = 0;

    productosEnCarrito.forEach(function (producto) {
        var listItem = document.createElement('li');
        listItem.textContent = `${producto.nombre} - $${producto.precio.toFixed(2)}`;
        listaCarrito.appendChild(listItem);

        total += producto.precio;
    });

    totalCarrito.textContent = `Total: $${total.toFixed(2)}`;
}

function DOM(mensaje) {
    var mensajeElemento = document.createElement('p');
    mensajeElemento.textContent = mensaje;
    document.body.appendChild(mensajeElemento);
}

function procesarCompra() {
    if (productosEnCarrito.length === 0) {
        alert("No hay productos en el carrito. Agregue productos antes de procesar la compra.");
        return;
    }
    DOM("¡Compra procesada con éxito!");
    console.log("Compra procesada con éxito.");
    
}

function almacenarCarritoEnLocalStorage() {
    localStorage.setItem('carrito', JSON.stringify(productosEnCarrito));
}

function recuperarCarritoDesdeLocalStorage() {
    var carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        productosEnCarrito = JSON.parse(carritoGuardado);
        actualizarCarrito();
    }
}

function limpiarCarrito() {
    productosEnCarrito = [];
    actualizarCarrito();
    almacenarCarritoEnLocalStorage();
}
