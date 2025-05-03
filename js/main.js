// Crear listas a utilizar
let proveedor = [];
let producto = [];
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
// Proveedor
document.addEventListener("DOMContentLoaded",() => {
    const proveedoresRegistrados= JSON.parse(localStorage.getItem("proveedor"));
    if(proveedoresRegistrados){
        proveedor=proveedoresRegistrados;
        mostrarProveedor();
    }
})

// Productos
document.addEventListener("DOMContentLoaded",() => {
    const productosAgregados= JSON.parse(localStorage.getItem("producto"));
    if(productosAgregados){
        producto=productosAgregados;
        mostrarProductos();
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

//---------------------------------------------------------------------------       


let historial = [];
let contadorFactura = 1;

async function generarOrden() {
const tabla = document.getElementById('tablaProductos').querySelector('tbody');
if (tabla.rows.length === 0) {
    alert("No hay productos agregados");
    return;
}

let contenido = `Factura N°${contadorFactura}\n\n`;

for (let row of tabla.rows) {
    const [id, nombre, cantidad, valor] = Array.from(row.cells).map(cell => cell.textContent.trim());
    contenido += `ID: ${id} | Nombre: ${nombre} | Cantidad: ${cantidad} | Valor: ${valor}\n`;
}

  // Mostrar en historial
historial.push(contenido);
mostrarHistorial();

  // Generar PDF con jsPDF
const { jsPDF } = window.jspdf;
const doc = new jsPDF();
doc.setFontSize(12);
doc.text(contenido, 10, 10);
doc.save(`Factura_${contadorFactura}.pdf`);

contadorFactura++;
}

function mostrarHistorial() {
const div = document.getElementById('facturasGuardadas');
  div.innerHTML = ''; // Limpiar

historial.forEach((factura, index) => {
    const pre = document.createElement('pre');
    pre.classList.add('bg-light', 'p-3', 'border', 'mb-2');
    pre.textContent = factura;
    div.appendChild(pre);
});
}

