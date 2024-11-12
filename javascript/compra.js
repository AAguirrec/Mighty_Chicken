function iniciar() {
    const nombre = document.getElementById('nombre').value.trim();
    const presupuesto = Number(document.getElementById('presupuesto').value.trim());
    const cantidad = +document.getElementById('cantidad').value.trim();
    const direccion = document.getElementById('direccion').value.trim();
    let entregaSeleccionada;
    document.getElementsByName("entrega").forEach(e => {
    if (e.checked) {
        entregaSeleccionada = e;
    }
});
    let errores = [];

    if (nombre === "" || nombre.length > 20) {
        errores.push("El campo Nombre es obligatorio y no debe superar 20 caracteres.");
    }

    if (!presupuesto || presupuesto <= 0) {
        errores.push("El campo Presupuesto es obligatorio y debe ser un número positivo en pesos.");
    }

    if (!cantidad || cantidad <= 0 || cantidad > 20) {
    errores.push("El campo Cantidad debe ser un número positivo y no debe superar 20 productos.");
}

    if (direccion === "") {
        errores.push("El campo Dirección es obligatorio.");
    }

    if (!entregaSeleccionada) {
        errores.push("Debe seleccionar un tipo de entrega.");
    }

    let presupuestoFinal = presupuesto;
    if (entregaSeleccionada && entregaSeleccionada.value === "domicilio") {
        presupuestoFinal += 15000;
    }

    if (errores.length > 0) {
        alert(errores.join("\n"));
    } else {
        localStorage.setItem('presupuesto', presupuestoFinal);
        window.location.href = 'productos.html';
    }
}

function limpiar() {
    document.getElementById('nombre').value = '';
    document.getElementById('presupuesto').value = '';
    document.getElementById('cantidad').value = '';
    document.getElementById('direccion').value = '';
    document.getElementsByName("entrega").forEach(radio => radio.checked = false);

}