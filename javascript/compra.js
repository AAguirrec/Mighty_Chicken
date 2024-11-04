function iniciar() {
    const nombre = document.getElementById('nombre').value.trim();
    const presupuesto = document.getElementById('presupuesto').value.trim();
    const cantidad = document.getElementById('cantidad').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    const entrega = document.querySelector('input[name="entrega"]:checked');

    let errores = [];

    if (nombre === "" || nombre.length > 20) {
        errores.push("El campo Nombre es obligatorio y no debe superar 20 caracteres.");
    }

    if (!presupuesto || isNaN(presupuesto) || presupuesto <= 0) {
        errores.push("El campo Presupuesto es obligatorio y debe ser un número en pesos.");
    }

    if (!cantidad || isNaN(cantidad) || cantidad <= 0 || cantidad > 20) {
        errores.push("El campo Cantidad debe ser un número positivo y no debe superar 20 productos.");
    }

    if (direccion === "") {
        errores.push("El campo Dirección es obligatorio.");
    }

    if (!entrega) {
        errores.push("Debe seleccionar un tipo de entrega.");
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        window.location.href = 'productos.html';
    }
}

function limpiar() {
    document.getElementById('nombre').value = '';
    document.getElementById('presupuesto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('direccion').value = '';
}