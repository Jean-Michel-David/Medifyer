<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');

require_once("./Admin.class.php");
$headers = getallheaders();
if (empty($headers['Authorization'])) {
    http_response_code(401);
    exit;
}

/**
 * Getting the list of users
 */
if (isset($_GET['getUserList'], $_GET['page'])) {
    $userList = AdminManager::getUserList($headers['Authorization'], $_GET['getUserList'], $_GET['page']);
    if (!$userList) {
        http_response_code(400);
        exit;
    }

    echo json_encode($userList);
    exit;
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