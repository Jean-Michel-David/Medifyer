<?php
//TODO This file is a mockup. It should be replaced by the db implementation as soon as possible !
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['list']))
    echo json_encode([
        '1' => [
            'nom' => 'Strens',
            'prenom' => 'Daniel',
            'matricule' => 'LA217024'
        ],
        
        '2' => [
            'nom' => 'Matteo',
            'prenom' => 'Firenze',
            'matricule' => 'LA217891'
        ]
    ]);
}