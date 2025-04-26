<?php
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$archivo = 'db/users.json';

if (!file_exists($archivo)) {
    echo json_encode(["success" => false, "message" => "Base de datos no encontrada."]);
    exit;
}

$usuarios = json_decode(file_get_contents($archivo), true);

foreach ($usuarios as $usuario) {
    if ($usuario['username'] === $username && $usuario['password'] === $password) {
        echo json_encode(["success" => true, "message" => "Login exitoso."]);
        exit;
    }
}

echo json_encode(["success" => false, "message" => "Credenciales incorrectas."]);
?>
