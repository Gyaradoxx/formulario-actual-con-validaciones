<?php

$link = 'mysql:host=localhost;port=3306;dbname=escuela it;charset=utf8mb4';

$user = "root";

$password = "";

try {

    $connection = new PDO($link, $user, $password);
    echo "Connection established";

} catch (PDOException $e) {
    print "Error: " . $e->getMessage();
    die();
}

