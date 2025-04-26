<?php
$data = json_decode(file_get_contents('php://input'), true);

$username = $data['username'];
$password = $data['password'];

$archivo = 'db/users.json';

if (file_exists($archivo)) {
    $usuarios = json_decode(file_get_contents($archivo), true);
} else {
    $usuarios = [];
}

foreach ($usuarios as $usuario) {
    if ($usuario['username'] === $username) {
        echo json_encode(["success" => false, "message" => "El usuario ya existe."]);
        exit;
    }
}

$usuarios[] = [
    "username" => $username,
    "password" => $password,
    "rol" => "usuario"
];

file_put_contents($archivo, json_encode($usuarios, JSON_PRETTY_PRINT));

echo json_encode(["success" => true, "message" => "Registro exitoso."]);
?>
