<?php

include_once  'connection.php';




$delete = "DELETE FROM id WHERE id = ? ";


$sql_delete = $connection->prepare($delete);

$sql_delete->execute(array($_GET ['id']));



$sql_delete = null;
$connection = null;

header('location: ../index.php');
