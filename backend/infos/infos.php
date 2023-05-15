<?php
require_once(dirname(__FILE__) . '/../env.php');

global $authorizedURL;
header('Access-Control-Allow-Origin: ' . $authorizedURL);
header('Access-Control-Allow-Methods: GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
// If this is a preflight request, respond with the appropriate headers and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}


require_once(dirname(__FILE__) . '/Infos.class.php');
$infoObj = new Infos();

if (!empty($_GET['getInfo'])) {
    $info = $infoObj->getInfo($_GET['getInfo']);
    echo json_encode($info);
    exit;
}

if (isset($_GET['getAllInfobulles'])) {
    $infos = $infoObj->getAllInfobulles();
    echo json_encode($infos);
    exit();
}

if (isset($_GET['getAllInfos'])) {
    $infos = $infoObj->getAllInfos();
    echo json_encode($infos);
    exit();
}

http_response_code(404);
