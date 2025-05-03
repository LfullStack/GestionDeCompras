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

// === Mostrar productos ===
function mostrarProductos() {
    const tabla = document.getElementById('tablaProducto');
    if (!tabla) return;

    tabla.innerHTML = "";
    producto.forEach(p => {
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

    // Recuperar productos
    const productosGuardados = JSON.parse(localStorage.getItem("producto"));
    if (productosGuardados) {
        producto = productosGuardados;
        mostrarProductos();
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
            producto.push(nuevoProducto);

            localStorage.setItem("producto", JSON.stringify(producto));
            mostrarProductos();
            formProducto.reset();
        });
    }
});
