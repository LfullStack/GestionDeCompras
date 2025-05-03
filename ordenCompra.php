<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Orden de compra || Inventario Global</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

</head>
<body class="body-general">
    <h1 class="text-center mt-4 text-primary">INVENTARIO GLOBAL</h1>

    <!-- Navbar -->
    <div class="container proveedor ">
        <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-secondary">
            <div class="container">
                <h3 class="navbar-brand "><strong>Orden de Compra</strong></h3>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item"><a class="nav-link text-light" href="index.php">Menu Principal</a></li>
                        <li class="nav-item"><a class="nav-link text-light" href="ordenCompra.php">Productos</a></li>
                        <li class="nav-item "><a class="nav-link text-light" data-bs-toggle="collapse" data-bs-target="#productoAgregado" href="ordenCompra.php">Agregados</a></li>
                        
                    </ul>
                </div>
            </div>
        </nav>
    </div>

    <!-- Agragar Producto -->
    <div class="container mt-5 formProducto" >
        <h2 class="text-center mb-4">Registro de Productos</h2>
        
        <form class=" p-4 rounded formProveedor " id="formProducto" >
            <div class="mb-3">
                <label for="nombreProducto" class="form-label">Nombre </label>
                <input type="text" class="form-control t border-light" id="nombreProducto" placeholder="Torombolo">
            </div>
    
            <div class="mb-3">
                <label for="cantidadProducto" class="form-label">Cantidad</label>
                <input type="number" class="form-control  border-light" id="cantidadProducto" placeholder="5">
            </div>
    
            <div class="mb-3">
                <label for="precioProducto" class="form-label">Precio</label>
                <input type="number" class="form-control  border-light" id="precioProducto" placeholder="500.000 COP">
            </div>
    
            <button type="submit" class="btn btn-primary w-100">Agregar Producto</button>
        </form>
    </div>
    <!-- Menú oculto de proveedores -->
    <div class="collapse mt-4" id="productoAgregado">
        <div class="card card-body bg-secondary text-light">
            <h4>Productos Agregados</h4>
            <table class="table table-dark table-striped mt-3" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Cantidad</th>
                        <th>Valor</th>
                    </tr>
                </thead>
                <tbody id='tablaProducto'>
                </tbody>
            </table>

            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary" id="generarOrden" type="button">Generar Orden</button>
            </div>
        </div>
            <a href="plantillaOrden.php" target="_blank" title="Ver orden de compra"><button type="submit" class="btn btn-primary w-100 boton-Generar" onclick="generarOrden()">Generar Orden de Compra</button></a>
    </div>
    

    <!-- Footer -->
    <footer class="bg-dark text-light">
        <div class="container">
        <p>© 2025 Inventario Global. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
