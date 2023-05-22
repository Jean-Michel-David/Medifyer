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

if (!empty($headers['Authorization'])) {
   $creds = new Credentials();
   if (! $creds->hasAdminCredentials($headers['Authorization'])) {
       http_response_code(401);
       exit();
   }
}
else {
    http_response_code(401);
    exit();
}

$adminId = $creds->extractUserId($headers['Authorization']);


if($_SERVER['REQUEST_METHOD'] == "GET") {
    /**
     * Getting the list of users
     */
    if (isset($_GET['getUserList']) && isset($_GET['userCount'])) {
        $userList = AdminManager::getUserList($_GET['getUserList'], $_GET['userCount']);

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
        $searches = AdminManager::getUserSearches($_GET['getUserSearches']);

        if (!$searches) {
            http_response_code(204);
            exit();
        }

        http_response_code(200);
        echo json_encode($searches);
        exit();
    }

    if (!empty($_GET['getUserSharedSearches'])) {
        $searches = AdminManager::getSharedUserSearches($_GET['getUserSharedSearches']);

        if (!$searches) {
            http_response_code(204);
            exit();
        }

        http_response_code(200);
        echo json_encode($searches);
        exit();
    }
}

elseif ($_SERVER['REQUEST_METHOD'] == "POST") {
    $json_obj = json_decode(file_get_contents('php://input'), true);

    /**
     * Setting an info
     */
    if (!empty($json_obj['label']) && !empty($json_obj['text'])) {
        $success = AdminManager::setInfobulles($json_obj['label'], $json_obj['text']);
        echo $success;
        exit();
    }

    /**
     * Setting the admin status of a user
     */
    if (!empty($json_obj['user']) && isset($json_obj['setAdminStatus'])) {
        $msg = AdminManager::setAdminStatus($adminId, $json_obj['user'], $json_obj['setAdminStatus']);
        $success = (strlen($msg) == 0);
        echo json_encode([
            "success" => $success,
            "message" => $msg
        ]);

        exit();
    }

    /**
     * Commenting on a question
     */
    if (!empty($json_obj['comment']) && !empty($json_obj['questionId'])) {
        if (AdminManager::commentQuestion($json_obj['comment'], $json_obj['questionId'])) {
            echo true;
            exit();
        }
        else {
            http_response_code(400);
            exit();
        }

    }
}

http_response_code(404);