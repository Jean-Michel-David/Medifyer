<?php
require_once("./Admin.class.php");

/**
 * Getting the list of users
 */
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
            'nom' => 'Firenze',
            'prenom' => 'Matteo',
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
            ['id' => '1', 'question' => 'Quel est l’impact de la thérapie par la réalité virtuelle sur la qualité de vie des patients présentant des vertiges ou des troubles vestibulaires ?']
        , ['id' => '2', 'question' => 'Velit culpa dolor velit magna cupidatat qui pariatur pariatur pariatur aliqua deserunt aliqua.']
        , ['id' => '3', 'question' => 'Est commodo eiusmod duis est sint enim enim veniam minim.']
    ]);
    return;
}