<?php
//TODO This file is a mockup. It should be replaced by the db implementation as soon as possible !
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
// TODO : add verification that the request comes from an admin

//Getting the list of users
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    if (isset($_GET['getUserList'])) {
        if (strlen($_GET['getUserList']) == 0)
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

        else echo json_encode([
            [
                'id' => '1',
                'nom' => 'Strens',
                'prenom' => 'Daniel',
                'email' => 'LA217024@student.helha.be',
                'pfp' => 'NULL',
                'isAdmin' => 'false'
            ]
        ]);
        return;
    }

    // Getting the list of search equations of a particular user
    if (!empty($_GET['getUserSearches'])) {
        echo json_encode([
            '1' => 'Quel est l’impact de la thérapie par la réalité virtuelle sur la qualité de vie des patients présentant des vertiges ou des troubles vestibulaires ?'
            ,'2' => 'Velit culpa dolor velit magna cupidatat qui pariatur pariatur pariatur aliqua deserunt aliqua.'
            ,'3' => 'Est commodo eiusmod duis est sint enim enim veniam minim.'
        ]);
        return;
    }
}

