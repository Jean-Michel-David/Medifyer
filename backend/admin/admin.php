<?php
require_once(dirname(__FILE__) . '/../env.php');

global $authorizedURL;
header('Access-Control-Allow-Origin: ' . $authorizedURL);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
// If this is a preflight request, respond with the appropriate headers and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

require_once(dirname(__FILE__) . '/Admin.class.php');
$headers = getallheaders();

if (empty($headers['Authorization'])) {
   http_response_code(401);
   exit();
}
if($_SERVER['REQUEST_METHOD'] == "GET") {
    /**
     * Getting the list of users
     */
    if (isset($_GET['getUserList']) && isset($_GET['userCount'])) {
        $userList = AdminManager::getUserList($headers['Authorization'], $_GET['getUserList'], $_GET['userCount']);

        //Error, bad request
        if (gettype($userList) == "boolean") {
            http_response_code(400);
            exit();
        }

        //HTTP RESPONSE no content
        if (gettype($userList) == "array" && !$userList) {
            http_response_code(204);
        }

        //Success
        http_response_code(200);
        echo json_encode($userList);
        exit();
    }

    /**
     *  Getting the list of search equations of a particular user
     */
    if (!empty($_GET['getUserSearches'])) {
        $searches = AdminManager::getUserSearches($headers['Authorization'], $_GET['getUserSearches']);

        if (!$searches) {
            http_response_code(400);
            exit();
        }

        http_response_code(200);
        echo json_encode($searches);
        exit();
    }
}

elseif ($_SERVER['REQUEST_METHOD'] == "POST") {

    /**
     * Setting an info
     */
    if (!empty($_POST['infoLabel']) && !empty($_POST['infoText'])) {

    }
}