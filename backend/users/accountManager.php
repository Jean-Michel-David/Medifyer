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

// on récupère les informations stockée en base de données
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (empty($headers['Authorization'])) {
        http_response_code(401);
        exit();
    }  
    $res = $userManager->getUserByID($headers['Authorization']);
    $user->setId($res['user_id']);
    $user->setLastname($res['nom_user']);
    $user->setFirstname($res['prenom_user']);
    $user->setPwd($res['psw_user']);
    $user->setPhoto($res['pfp_user']);
    $user->setAdminStatus(($res['admin_user']));
    $user->setEmail($res['email_user']);
    echo json_encode($user);
// On envoie les informations modifiées au serveur
} else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($headers['Authorization'])) {
        http_response_code(401);
        exit();
    }  
    $json_obj = json_decode(file_get_contents('php://input'), true);
    $user->setId($json_obj['id']);
    if ($json_obj['firstname'] == null || strlen($json_obj['firstname'])>50) {
        http_response_code(400);
        "Prénom Invalide ! ";
        exit;
    }
    if ($json_obj['lastname'] == null || strlen($json_obj['lastname'])>50) {
        http_response_code(400);
        echo "Nom Invalide ! ";
        exit;
    }
    if($json_obj['pwd'] == null){
        http_response_code(400);
        echo "Mot de passe Invalide";
        exit;
    }
    // on doit vérifier si le mot de passe a été modifié, si oui il faut le hacher à nouveau
    if ($json_obj['pwd'] !== $user->getPwd()) {
        // le mdp est différent, on le hache de nouveau
        $pwdhashed = password_hash($json_obj['pwd'], PASSWORD_BCRYPT, $options);
    }else {
        // sinon on le mets tel dans la variable
        $pwdhashed = $json_obj['pwd'];
    }
    // on set les nouvelles variable dans $user
    $user->setFirstname($json_obj['firstname']);
    $user->setLastname($json_obj['lastname']);
    $user->setEmail($json_obj['email']);
    $user->setPwd($pwdhashed);
    $user->setPhoto($json_obj['photo']);
    $succes = $userManager->modifyUser($user);
    if ($succes == false) {
        http_response_code(400);
        exit();
    } else {
        http_response_code(200);
        echo "User modified with Succes";
        exit();
    }
}