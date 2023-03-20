<?php
try {
    $user = 'root';
    $psw = '';
    $dbName = '';
    $db = new PDO(
        'mysql:host=localhost;dbname=' . $dbName . ';charset=utf8mb4',
        $user,
        $psw,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ],
    );
}
catch (PDOexception $e) {
    die('problem : ' . $e);
}
