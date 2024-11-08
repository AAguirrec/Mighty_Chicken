// Variables para gestionar el carrito y el total
let totalCompra = 0;
let totalFinal = 0;
const costoDomicilio = 15000;

function updateTotal() {
    totalFinal = totalCompra + costoDomicilio;
    document.getElementById("totalCompra").textContent = totalCompra;
    document.getElementById("totalFinal").textContent = totalFinal;
}

function cancelPurchase() {
    if (confirm("¿Está seguro de cancelar la compra?")) {
        window.location.href = "/html/productos.html";
    }
}

function continueShopping() {
    window.location.href = "/html/productos.html";
}

function clearFields() {
    document.getElementById("cardNumber").value = "";
    document.getElementById("expirationDate").value = "";
    document.getElementById("securityCode").value = "";
    document.getElementById("cardHolder").value = "";
    document.getElementById("country").selectedIndex = 0;
    document.getElementById("cardType").selectedIndex = 0;
}

function toggleSecurityCode() {
    const securityCode = document.getElementById("securityCode");
    securityCode.type = securityCode.type === "password" ? "text" : "password";
}

function confirmPurchase() {
    const confirmButton = document.getElementById("confirmPurchase");
    confirmButton.disabled = true;
    new Promise((resolve, reject) => {
        const valid = validatePurchase();
        setTimeout(() => valid ? resolve() : reject("Error en la información de la compra."), Math.random() * 1000 + 2000);
    })
    .then(() => {
        alert("Pago realizado con éxito. Serás redirigido a la página principal.");
        window.location.href = "/html/compra.html";
    })
    .catch(error => {
        alert(error);
        confirmButton.disabled = false;
    });
}

function validatePurchase() {
    // Validación de la tarjeta y condiciones de la compra
    const cardNumber = document.getElementById("cardNumber").value;
    const expirationDate = document.getElementById("expirationDate").value;
    const securityCode = document.getElementById("securityCode").value;
    if (cardNumber.length !== 16 || expirationDate.length !== 5 || securityCode.length !== 3) return false;
    return true;  // Añadir más validaciones si es necesario
}
function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tablaCarrito = document.getElementById('tablaCarrito');
    let totalCompra = 0;

    tablaCarrito.innerHTML = "";

    carrito.forEach((producto, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
                        <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: auto;"></td>

            <td>$${producto.Precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.Precio * producto.cantidad}</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tablaCarrito.appendChild(fila);
        totalCompra += producto.Precio * producto.cantidad;
    });

    document.getElementById('totalCompra').textContent = totalCompra;
}
//document.addEventListener('DOMContentLoaded', cargarCarrito);


function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1); // Elimina el producto del carrito
    localStorage.setItem('carrito', JSON.stringify(carrito)); // Actualiza el carrito en localStorage
    cargarCarrito(); // Vuelve a cargar la tabla del carrito
}

// Asegúrate de cargar el carrito cuando se cargue la página
window.onload = cargarCarrito;

