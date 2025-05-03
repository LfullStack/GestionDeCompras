// Listas generales
let proveedor = [];
let producto = [];
let ordenCompra = [];
let remision = [];
let factura = [];
let carrito = [];

// === Funciones de utilidad ===
function registrarProveedor(nombreP, nitP, ubicacionP, telefonoP) {
    return {
        id: Date.now(),
        nombreP,
        nitP,
        ubicacionP,
        telefonoP
    };
}

function agregarProducto(nombre, cantidad, valor) {
    return {
        id: Date.now(),
        nombre,
        cantidad,
        valor
    };
}

// === Mostrar proveedores ===
function mostrarProveedor() {
    const tabla = document.getElementById('tablaProveedores');
    if (tabla) {
        tabla.innerHTML = "";
        proveedor.forEach(p => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${p.nombreP}</td>
                <td>${p.nitP}</td>
                <td>${p.ubicacionP}</td>
                <td>${p.telefonoP}</td>
            `;
            tabla.appendChild(fila);
        });
    }

    // Mostrar datos en la plantilla si existen
    const p = proveedor[proveedor.length - 1];
    if (p) {
        document.getElementById('nombreProveedor') && (document.getElementById('nombreProveedor').innerHTML = `<strong>Nombre:</strong> ${p.nombreP}`);
        document.getElementById('nitProveedor') && (document.getElementById('nitProveedor').innerHTML = `<strong>NIT:</strong> ${p.nitP}`);
        document.getElementById('ubicacionProveedor') && (document.getElementById('ubicacionProveedor').innerHTML = `<strong>Ubicación:</strong> ${p.ubicacionP}`);
        document.getElementById('telefonoProveedor') && (document.getElementById('telefonoProveedor').innerHTML = `<strong>Teléfono:</strong> ${p.telefonoP}`);
    }
}

// === Mostrar productos en carrito ===
function mostrarProductos() {
    const tabla = document.getElementById('tablaProducto') || document.getElementById('productosEscogidos');
    if (!tabla) return;

    tabla.innerHTML = "";
    carrito.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>$${p.valor}</td>
        `;
        tabla.appendChild(fila);
    });

    // Calcular y mostrar totales si están disponibles los elementos
    const subtotal = carrito.reduce((acc, p) => acc + (parseFloat(p.valor) * parseFloat(p.cantidad)), 0);
    const iva = subtotal * 0.19;
    const flete = 15000; // fijo
    const total = subtotal + iva + flete;

    document.getElementById('subtotal') && (document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`);
    document.getElementById('iva') && (document.getElementById('iva').textContent = `$${iva.toFixed(2)}`);
    document.getElementById('flete') && (document.getElementById('flete').textContent = `$${flete.toFixed(2)}`);
    document.getElementById('totalPago') && (document.getElementById('totalPago').textContent = `$${total.toFixed(2)}`);
}

// === Recuperar datos guardados ===
document.addEventListener("DOMContentLoaded", () => {
    // Recuperar proveedores
    const proveedoresGuardados = JSON.parse(localStorage.getItem("proveedor"));
    if (proveedoresGuardados) {
        proveedor = proveedoresGuardados;
        mostrarProveedor();
    }

    // Recuperar carrito
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        mostrarProductos();
    }

    // Recuperar órdenes anteriores
    const ordenesGuardadas = JSON.parse(localStorage.getItem("ordenCompra"));
    if (ordenesGuardadas) {
        ordenCompra = ordenesGuardadas;
    }

    // Mostrar fecha e ID si están los elementos
    const idOrdenCompra = Date.now();
    document.getElementById("idOrdenCompra") && (document.getElementById("idOrdenCompra").textContent = idOrdenCompra);
    document.getElementById("fechaEmision") && (document.getElementById("fechaEmision").textContent = `Fecha Emisión: ${new Date().toLocaleDateString()}`);

    // === Formularios ===
    const formProveedor = document.getElementById('formProveedor');
    if (formProveedor) {
        formProveedor.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = document.getElementById("nombreP").value;
            const nit = document.getElementById("nitP").value;
            const ubicacion = document.getElementById("ubicacionP").value;
            const telefono = document.getElementById("telefonoP").value;

            const nuevoProveedor = registrarProveedor(nombre, nit, ubicacion, telefono);
            proveedor.push(nuevoProveedor);

            localStorage.setItem("proveedor", JSON.stringify(proveedor));
            mostrarProveedor();
            formProveedor.reset();
        });
    }

    const formProducto = document.getElementById('formProducto');
    if (formProducto) {
        formProducto.addEventListener('submit', function (e) {
            e.preventDefault();
            const nombre = document.getElementById("nombreProducto").value;
            const cantidad = document.getElementById("cantidadProducto").value;
            const valor = document.getElementById("precioProducto").value;

            const nuevoProducto = agregarProducto(nombre, cantidad, valor);
            carrito.push(nuevoProducto);

            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarProductos();
            formProducto.reset();
        });
    }

    const botonGenerar = document.getElementById("generarOrden");
    if (botonGenerar) {
        botonGenerar.addEventListener("click", () => {
            if (carrito.length === 0) {
                alert("No hay productos para generar la orden.");
                return;
            }

            const nuevaOrden = {
                id: Date.now(),
                fecha: new Date().toLocaleString(),
                productos: [...carrito]
            };

            ordenCompra.push(nuevaOrden);
            localStorage.setItem("ordenCompra", JSON.stringify(ordenCompra));

            // Limpiar carrito
            carrito = [];
            localStorage.setItem("carrito", JSON.stringify(carrito));
            mostrarProductos();

            // Abrir plantilla en nueva pestaña
            window.open("plantillaOrden.html", "_blank");
        });
    }
});


//Registrar productos desde formulario
formProducto.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const cantidad = document.getElementById("cantidadProducto").value;
    const valor = document.getElementById("precioProducto").value;
    
    // Agrega a la lista de proveedores
    const nuevoProducto = productosAgregados(nombre, cantidad, valor);
    producto.push(nuevoProducto);
    
    // Actualizar lista
    localStorage.setItem("producto",JSON.stringify(producto));
    mostrarProveedor();

    // Limpiar form

    formProducto.reset();
    
});
