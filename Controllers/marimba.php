<?php
$categoria = 'marimba';
$instrumentosData = file_get_contents('db/instrumentos.json');
$instrumentos = json_decode($instrumentosData, true);
?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <title>Marimbas Chiapanecas</title>
  <link rel="stylesheet" href="css/estilos.css">
</head>
<body>

<header>
  <h1>Marimbas Disponibles</h1>
  <nav>
    <a href="bienvenida.php">Inicio</a>
    <a href="marimba.php">Marimba</a>
    <a href="tunkul.php">Tunkul</a>
    <a href="arpa.php">Arpa</a>
    <!-- Otros enlaces -->
  </nav>
</header>

<div class="contenedor-principal">

<?php foreach ($instrumentos as $instrumento): ?>
  <?php if ($instrumento['categoria'] === $categoria): ?>
    <div class="contenedor">
      <div class="imagen">
        <img src="<?php echo $instrumento['imagen']; ?>" alt="<?php echo htmlspecialchars($instrumento['nombre']); ?>">
      </div>
      <div class="detalles">
        <h2><?php echo htmlspecialchars($instrumento['nombre']); ?></h2>
        <div class="descripcion">
          <?php echo htmlspecialchars($instrumento['descripcion']); ?>
        </div>
        <div class="caracteristicas">
          <strong>Características:</strong><br>
          <?php foreach ($instrumento['caracteristicas'] as $caracteristica): ?>
            - <?php echo htmlspecialchars($caracteristica); ?><br>
          <?php endforeach; ?>
        </div>
        <div class="marca"><strong>Marca:</strong> <?php echo htmlspecialchars($instrumento['marca']); ?></div>
        <div class="precio"><strong>Precio:</strong> $<?php echo number_format($instrumento['precio'], 2); ?> MXN</div>
        <a href="#" class="comprar-btn">Comprar ahora</a>
      </div>
    </div>
  <?php endif; ?>
<?php endforeach; ?>

</div>

</body>
</html>
