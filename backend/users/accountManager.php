<?php

require_once(dirname(__FILE__) . '/./User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/./UserManager.php');
require_once(dirname(__FILE__) . '/../credentials.php');

global $authorizedURL;
header('Access-Control-Allow-Origin: '. $authorizedURL);
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
header('Access-Control-Allow-Methods: GET,POST,PUT,DELETE');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

$headers = getallheaders();
$user = new User();
$credentials = new Credentials();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$res = array();

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $res = $userManager->getUserByID($headers['Authorization']);
    $user->setId($res['user_id']);
    $user->setLastname($res['nom_user']);
    $user->setFirstname($res['prenom_user']);
    $user->setPwd($res['psw_user']);
    $user->setPhoto($res['pfp_user']);
    $user->setAdminStatus(($res['admin_user']));
    $user->setEmail($res['email_user']);
    echo json_encode($user);
}