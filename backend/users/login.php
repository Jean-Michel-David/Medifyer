<?php

require(dirname(__FILE__) . '/./User.class.php');
require(dirname(__FILE__) . '/../database/dbConnection.php');
require(dirname(__FILE__) . '/./UserManager.php');
require (dirname(__FILE__) . '/../credentials.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

$user = new User();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$res = array();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_obj = json_decode(file_get_contents('php://input'), true);
    $res = $userManager->getUser($json_obj['email']);
    $user->setId($res['user_id']);
    $user->setLastname($res['nom_user']);
    $user->setFirstname($res['prenom_user']);
    $user->setPwd($res['psw_user']);
    $user->setPhoto($res['pfp_user']);
    $user->setAdminStatus(($res['admin_user']));
    $user->setEmail($res['email_user']);
    echo json_encode($user);
}