let totalFinal = 0;
const costoDomicilio = 15000;

    function updateTotal(totalCompra = 0, totalFinal = costoDomicilio) {
    document.getElementById("totalCompra").textContent = `$${totalCompra}`;
    document.getElementById("totalFinal").textContent = `$${totalFinal}`;
}

function cancelarCompra() {
    if (confirm("¿Está seguro de cancelar la compra?")) {
        localStorage.removeItem('carrito');
        window.location.href = "/html/productos.html";
    }
}

function continuarCompra() {
    window.location.href = "/html/productos.html";
}

function borrarcampos() {
    document.getElementById("numtarjeta").value = "";
    document.getElementById("fechaexp").value = "";
    document.getElementById("codsegur").value = "";
    document.getElementById("tittarjeta").value = "";
    document.getElementById("pais").selectedIndex = 0;
    document.getElementById("tiptarjeta").selectedIndex = 0;
}

function togglecodsegur() {
    const codsegur = document.getElementById("codsegur");
    codsegur.type = codsegur.type === "password" ? "text" : "password";
}

function confirmcompra() {
    const confirmButton = document.getElementById("confirmcompra");
    confirmButton.disabled = true;
    new Promise((resolve, reject) => {
        const valid = validarcompra();
        setTimeout(() => valid ? resolve() : reject("Error en la información de la compra."), Math.random() * 1000 + 2000);
    })
    .then(() => {
        alert("Pago realizado con éxito. Serás redirigido a la página principal.");
        localStorage.removeItem('carrito');
        window.location.href = "/html/compra.html";
    })
    .catch(error => {
        alert(error);
        confirmButton.disabled = false;
    });
}

function validarcompra() {
    const numtarjeta = document.getElementById("numtarjeta").value;
    const fechaexp = document.getElementById("fechaexp").value;
    const codsegur = document.getElementById("codsegur").value;
    if (numtarjeta.length !== 16 || fechaexp.length !== 5 || codsegur.length !== 3) {
    return false;
}
    return true;  
}

document.getElementById("numtarjeta").addEventListener("input", function(event) {
    let input = event.target.value;
    input = input.replace(/\D/g, ''); 
    let formattedInput = '';
    for (let i = 0; i < input.length; i += 4) {
        formattedInput += input.substring(i, i + 4); 
    }
    event.target.value = formattedInput.trim();
});


function cargarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const tablaCarrito = document.getElementById('tablaCarrito');
    const presupuesto = parseFloat(localStorage.getItem('presupuesto'));

    let totalCompra = 0;

    tablaCarrito.innerHTML = "";

    if (carrito.length === 0) {
        tablaCarrito.innerHTML = "<tr><td colspan='6'>No hay productos en el carrito.</td></tr>";
        totalFinal = costoDomicilio;

        updateTotal(0, costoDomicilio);
        return;
    }

    carrito.forEach((producto, index) => {
        const subtotal = producto.Precio * producto.cantidad;
        totalCompra+= subtotal;
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td><img src="${producto.imagen}" alt="${producto.nombre}" style="width: 50px; height: auto;"></td>
            <td>$${producto.Precio}</td>
            <td>${producto.cantidad}</td>
            <td>$${(producto.Precio * producto.cantidad)}</td>
            <td><button onclick="eliminarProducto(${index})">Eliminar</button></td>
        `;
        tablaCarrito.appendChild(fila);

    });
    totalFinal = carrito.length > 0 ? totalCompra + costoDomicilio : costoDomicilio;
    updateTotal(totalCompra, totalFinal);

    if (totalFinal > presupuesto) {
        alert(`El total de la compra ($${totalFinal}) excede el presupuesto especificado de $${presupuesto}.`);
    }

}
function eliminarProducto(index) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    carrito.splice(index, 1);  
    localStorage.setItem('carrito', JSON.stringify(carrito));
    cargarCarrito();  
}
window.addEventListener('load', cargarCarrito);