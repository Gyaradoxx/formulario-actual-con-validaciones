<?php


include_once 'connection.php';

// print_r($_POST);

// echo "<br>";

// echo $_POST ['nombre'];
$i = 0;
$arrayDatos = [];
foreach ($_POST as $clave => $valor) {
    $arrayDatos[$i] = $valor;

    $i++;
}

$insert = "INSERT INTO id(nombre, apellido,`fecha-nac`, dni, tel, email, `codigo-postal`, direccion, poblacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";

$sql_insert = $connection->prepare($insert);

$sql_insert->execute($arrayDatos);

$sql_insert = null;
$conn = null;

header('location: ../index.php');
