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

$user = new User();
$credentials = new Credentials();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$res = array();
$regex = '/^la[0-9]{6}@student\.helha\.be$/i';
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_obj = json_decode(file_get_contents('php://input'), true);
    if ($json_obj['email'] == null ||strlen($json_obj['email'])>50 || !preg_match($regex, $json_obj['email'])) {
        http_response_code(400);
        echo "Email invalide !";
        exit;
    }
    if ($json_obj['pwd'] == null) {
        http_response_code(400);
        echo "Mot de passe Invalide !";
        exit;
    }
    $res = $userManager->getUser($json_obj['email']);
    if (!password_verify($json_obj['pwd'], $res['psw_user'])) {
        http_response_code(400);
        echo "Les mots de passe ne correspondent pas";
        exit;
    }
    $user->setId($res['user_id']);
    $user->setLastname($res['nom_user']);
    $user->setFirstname($res['prenom_user']);
    $user->setPwd($res['psw_user']);
    $user->setPhoto($res['pfp_user']);
    $user->setAdminStatus(($res['admin_user']));
    $user->setEmail($res['email_user']);

    echo $credentials->createToken($user);
}