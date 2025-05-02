// Crear listas a utilizar
let proveedor = [];
let productos = [];
let ordenCompra = [];
let remision = [];
let factura = [];
let carrito = [];


// Recuperar proveedores guardados al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const proveedoresGuardados = JSON.parse(localStorage.getItem("proveedor"));
    if (proveedoresGuardados) {
        proveedor = proveedoresGuardados;
    }
});

// Registrar proveedor
function registrarProveedor(nombreP, nitP, ubicacionP, telefonoP) {
    return {
        id: Date.now(),
        nombreP,
        nitP,
        ubicacionP,
        telefonoP
    };
}

// Crear productos
function crearProductos(nombre, cantidad, valor) {
    return {
        id: Date.now(),
        nombre,
        cantidad,
        valor
    };
}

// Mostras productos
function mostrarProductos(){
    const lista=document.getElementById('tablaProducto');
    lista.innerHTML="";

    proveedor.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML= `
            <td>${p.nombre}</td>
            <td>${p.cantidad}</td>
            <td>${p.precio}</td> 
            <td> <button class="btn btn-sm btn-warning" onclick="editarEvento(${p.id})">Editar</button></td>
            <td> <button class="btn btn-sm btn-danger" onclick="eliminarEvento(${p.id})">Eliminar</button> </td>
        `;
        lista.appendChild(fila);
    });
}

// Mostras proveedores
function mostrarProveedor(){
    const lista=document.getElementById('tablaProveedores');
    lista.innerHTML="";

    proveedor.forEach(p => {
        const fila = document.createElement("tr");
        fila.innerHTML= `
            <td>${p.nombreP}</td>
            <td>${p.nitP}</td>
            <td>${p.ubicacionP}</td>
            <td>${p.telefonoP}</td> 
            <td> <button class="btn btn-sm btn-warning" onclick="editarEvento(${p.id})">Editar</button></td>
            <td> <button class="btn btn-sm btn-danger" onclick="eliminarEvento(${p.id})">Eliminar</button> </td>
        `;
        lista.appendChild(fila);
    });
}

// Reccuperar datoss guardados al recargar pagina
document.addEventListener("DOMContentLoaded",() => {
    const proveedoresRegistrados= JSON.parse(localStorage.getItem("proveedor"));
    if(proveedoresRegistrados){
        proveedor=proveedoresRegistrados;
        mostrarProveedor();
    }
})



// Registrar proveedor desde formulario
const formProveedor = document.getElementById('formProveedor');

formProveedor.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreP").value;
    const nit = document.getElementById("nitP").value;
    const ubicacion = document.getElementById("ubicacionP").value;
    const telefono = document.getElementById("telefonoP").value;
    
    // Agrega a la lista de proveedores
    const nuevoProveedor = registrarProveedor(nombre, nit, ubicacion, telefono);
    proveedor.push(nuevoProveedor);
    
    // Actualizar lista
    localStorage.setItem("proveedor",JSON.stringify(proveedor));
    mostrarProveedor();

    // Limpiar form

    formProveedor.reset();
    
});

//Registrar productos desde formulario
formProveedor.addEventListener('submit', function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreProducto").value;
    const nit = document.getElementById("cantidadProducto").value;
    const ubicacion = document.getElementById("precioProducto").value;
    
    // Agrega a la lista de proveedores
    const nuevoProveedor = registrarProveedor(nombre, nit, ubicacion, telefono);
    proveedor.push(nuevoProveedor);
    
    // Actualizar lista
    localStorage.setItem("proveedor",JSON.stringify(proveedor));
    mostrarProveedor();

    // Limpiar form

    formProveedor.reset();
    
});

//---------------------------------------------------------------------------       

// Manejo del carrito (selección de productos)
const formCarrito = document.getElementById('carritoCompras');
if (formCarrito) {
    formCarrito.addEventListener('submit', function (e) {
        e.preventDefault();

        carrito = [];

        const checkboxes = [
            { id: 'manzana', index: 0 },
            { id: 'refresco', index: 1 },
            { id: 'azucar', index: 2 },
            { id: 'sal', index: 3 },
            { id: 'lechuga', index: 4 },
            { id: 'naranja', index: 5 },
            { id: 'leche', index: 6 },
            { id: 'queso', index: 7 },
            { id: 'pan', index: 8 },
        ];

        let algunoSeleccionado = false;

        checkboxes.forEach(item => {
            const checkbox = document.getElementById(item.id);
            if (checkbox && checkbox.checked) {
                carrito.push(productos[item.index]);
                algunoSeleccionado = true;
            }
        });

        if (algunoSeleccionado) {
            localStorage.setItem("carrito", JSON.stringify(carrito)); // Guardar en localStorage
            alert('Artículos agregados al carrito');
        } else {
            alert('No seleccionó ningún producto');
        }
    });
}

// Botón para abrir carrito.html
const btnCarrito = document.getElementById("carrito");
if (btnCarrito) {
    btnCarrito.addEventListener("click", function () {
        window.open("carrito.html", "_blank");
    });
}

// Mostrar productos en la tabla del carrito
if (document.getElementById('productosEscogidos')) {
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito")) || [];
    let subtotal = 0;

    carritoGuardado.forEach(producto => {
        document.getElementById('productosEscogidos').innerHTML += `
            <tr>
                <td>${producto.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>$${producto.valor}</td>
            </tr>
        `;
        subtotal += producto.valor;
    });

    const iva = subtotal * 0.19;
    const total = subtotal + iva;

    document.getElementById("subtotal").textContent = `$${subtotal}`;
    document.getElementById("iva").textContent = `$${iva.toFixed(2)}`;
    document.getElementById("totalPago").textContent = `$${total.toFixed(2)}`;
}

// Mostrar fecha y número de factura
if (document.getElementById("fecha")) {
    const fecha = new Date().toLocaleDateString('es-ES');
    document.getElementById("fecha").textContent = `Fecha: ${fecha}`;
}
if (document.getElementById("idFactura")) {
    document.getElementById("idFactura").textContent = Math.floor(Math.random() * 1000000);
}

// Registrar datos del cliente
const formCliente = document.getElementById("formCliente");
if (formCliente) {
    formCliente.addEventListener("submit", function (e) {
        e.preventDefault();

        const nombre = document.getElementById("nombreCliente").value;
        const direccion = document.getElementById("direccionCliente").value;
        const telefono = document.getElementById("telefonoCliente").value;
        const email = document.getElementById("emailCliente").value;

        document.getElementById('nombre').innerHTML = `<strong>Nombre:</strong> ${nombre}`;
        document.getElementById('direccion').innerHTML = `<strong>Dirección:</strong> ${direccion}`;
        document.getElementById('telefono').innerHTML = `<strong>Teléfono:</strong> ${telefono}`;
        document.getElementById('email').innerHTML = `<strong>Email:</strong> ${email}`;

        const registroCliente = document.getElementById("formCliente");
        const factura= document.getElementById("factura");
        registroCliente.classList.add("d-none");
        factura.classList.remove("d-none");
    });
}
