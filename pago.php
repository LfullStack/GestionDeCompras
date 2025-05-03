<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Pagos || Inventario Global</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">

</head>
<body class="body-general">
    <h1 class="text-center mt-4 text-primary">INVENTARIO GLOBAL</h1>

    <!-- Navbar -->
    <nav class="navbar navbar-expand-lg bg-body-tertiary border-bottom border-secondary">
        <div class="container">
            <h3 class="navbar-brand "><strong>Pagos</strong></h3>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item"><a class="nav-link text-light" href="index.php">Menu Principal</a></li>
                    <li class="nav-item"><a class="nav-link text-light" href="pago.php">Remisiones</a></li>
                    <li class="nav-item "><a class="nav-link text-light" data-bs-toggle="collapse" data-bs-target="#facturaPendiente" href="pago.php">Facturas</a></li>
                </ul>
            </div>
        </div>
    </nav>  
    


    <!-- Lista de remisiones -->
    <div class=" mt-4" >
        <div class="card card-body bg-secondary text-light">
            <h2 class="text-center mb-4">Lista de Remisiones</h2>
            <table class="table table-dark table-striped mt-3" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Proveedor</th>
                        <th>Fecha Ingreso</th>
                    </tr>
                </thead>
                <tbody>
                    <th class="sin-remision" colspan="4"><span>¡ No hay remisiones sin registrar !</span></th>
                </tbody>
            </table>
        </div>
    </div>

    <div class="registrarRemision d-none">
        <!-- Remison Escogida -->
        <div class="d-flex justify-content-between align-items-center mb-4 d-none" >
            <div class="logo text-primary"><h3></h3>  .<span><h4></h4></span></div>
            <div class="text-end">
                <h5>Remision # <span id="idFactura"></span></h5>
                <p id="fecha">Fecha Emision:</p>
            </div>
        </div>
    
        <div class="mb-4">
            <h5>Cliente:</h5>
            <ol id="datosCliente">
                <li id="nombre"></li>
                <li id="nit"></li>
                <li id="contacto"></li>
                <li id="email"></li>
            </ol>
        </div>
    
        <table class="table table-bordered">
            <thead class="table-primary">
                <tr>
                    <th>ID</th>
                    <th>Producto</th>
                    <th>Cantidad</th>
                </tr>
            </thead>
            <tbody >
    
            </tbody>
        </table>
    
        <!-- Observaciones remision -->
        
        <form action="">
            <h3>Observaciones remision</h3>
            <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">ID Remision</label>
                <input type="number" class="form-control" id="exampleFormControlInput1" placeholder="#32542">
            </div>
            <div class="mb-3">
                <label for="exampleFormControlTextarea1" class="form-label">Indique sus novedades:</label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder="Se encontraron novedades en el estado de los productos..."></textarea>
            </div>
            <div class="d-grid gap-2 col-6 mx-auto">
                <button class="btn btn-primary" type="button">Registar Remision</button>
            </div>
        </form>
    </div>
    <!-- Menu Factura -->
    <div class="collapse mt-4" id="facturaPendiente">
        <div class="card card-body bg-secondary text-light">
            <h2 class="text-center mb-4">Factura Pendiente</h2>
            <table class="table table-dark table-striped mt-3" >
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Proveedor</th>
                        <th>Fecha Ingreso</th>
                    </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
            
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-dark text-light">
        <div class="container">
        <p>© 2025 Inventario Global. Todos los derechos reservados.</p>
        </div>
    </footer>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="js/main.js"></script>
</body>
</html>
