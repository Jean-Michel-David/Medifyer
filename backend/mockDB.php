<?php
//TODO This file is a mockup. It should be replaced by the db implementation as soon as possible !
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
// TODO : add verification that the request comes from an admin

//Getting the list of users
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['getUserList']))
    echo json_encode([
        [
            'id' => '1',
            'nom' => 'Strens',
            'prenom' => 'Daniel',
            'email' => 'LA217024@student.helha.be',
            'pfp' => 'NULL',
            'isAdmin' => 'false'
        ],
        [
            'id' => '2',
            'nom' => 'Matteo',
            'prenom' => 'Firenze',
            'matricule' => 'LA217891@student.helha.be',
            'pfp' => 'NULL',
            'isAdmin' => 'false'
        ]
    ]);
}