<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');

require_once("./Admin.class.php");
$headers = getallheaders();
//if (empty($headers['Authorization'] | null)) {
//    http_response_code(401);
//    exit();
//}
if($_SERVER['REQUEST_METHOD'] == "GET") {
    /**
     * Getting the list of users
     */
    if (isset($_GET['getUserList']) && isset($_GET['userCount'])) {
        $userList = AdminManager::getUserList(/*$headers['Authorization']*/null, $_GET['getUserList'], $_GET['userCount']);

        if (!$userList) {
            http_response_code(400);
            exit();
        }

        echo json_encode($userList);
        exit();
    }

    /**
     *  Getting the list of search equations of a particular user
     */
    if (!empty($_GET['getUserSearches'])) {
        $searches = AdminManager::getUserSearches(/*$headers['Authorization']*/null, $_GET['getUserSearches']);

        if (!$searches) {
            http_response_code(400);
            exit();
        }

        echo json_encode($searches);
        exit();
    }

    /**
     *  Getting the infobulles
     */
    if (isset($_GET['getInfoBulles'])) {

    }
}

elseif ($_SERVER['REQUEST_METHOD'] == "POST") {

    /**
     * Setting an infobulle
     */

}