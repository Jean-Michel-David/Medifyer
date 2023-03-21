<?php
//TODO This file is a mockup. It should be replaced by the db implementation as soon as possible !
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
// TODO : add verification that the request comes from an admin
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // if (isset($_GET['getUserList']))
    echo json_encode([
        [
            'nom' => 'Strens',
            'prenom' => 'Daniel',
            'matricule' => 'LA217024'
        ],
        [
            'nom' => 'Matteo',
            'prenom' => 'Firenze',
            'matricule' => 'LA217891'
        ]
    ]);
}