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
    if (!tabla) return;

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

// === Mostrar productos en carrito ===
function mostrarProductos() {
    const tabla = document.getElementById('tablaProducto');
    if (!tabla) return;

    tabla.innerHTML = "";
    carrito.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${p.id}</td>
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>${p.valor}</td>
        `;
        tabla.appendChild(fila);
    });
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

    // === Formularios ===

    // Proveedor
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

    // Producto
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

    // === Generar orden ===
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
