<?php

require_once(dirname(__FILE__) . '/../env.php');
require_once(dirname(__FILE__) . '/User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/UserManager.php');
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
$options = [
    'cost' => 12,
];

// on récupère les informations stockées en base de données
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
}
// On envoie les informations modifiées au serveur
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $json_obj = json_decode(file_get_contents('php://input'), true);
    // on va d'abord rechercher dans la base de données, l'utilisateur courant, pour reprendre ses données
    $compareUser = $userManager->getUserByID($headers['Authorization']);
    // on set les paramètres invariables (id, email, ...) dans un $user
    $user->setId($compareUser['user_id']);
    $user->setEmail($compareUser['email_user']);
    $user->setAdminStatus($compareUser['admin_user']);
    $user->setPhoto($compareUser['pfp_user']);
    // on va ensuite regarder si les paramètres modifiables : firstname, lastname et pwd, ont été modifiés
    // firstname
    if ($json_obj['firstname'] === $compareUser['prenom_user']) {
        // dans le cas où ils sont similaires, on insère la variable du compareUser dans le user
        $user->setFirstname($compareUser['prenom_user']);
    } else {
        // sinon, on set le nouveau prénom dans la variable user
        $user->setFirstname($json_obj['firstname']);
    }
    // pareil pour le lastname
    if ($json_obj['lastname'] === $compareUser['nom_user']) {
        $user->setLastname($compareUser['nom_user']);
    } else {
        $user->setLastname($json_obj['lastname']);
    }
    // pour le mdp, on vérifie si le mdp renvoyé est null ou vide
    if ($json_obj['pwd'] === "") {
        // si c'est le cas, on insère la valeur pwd du compareUser dans user
        $user->setPwd($compareUser['psw_user']);
    } else {
        // sinon, on vérifie si le mot de passe entré est valide, on le hash et on l'attribue à l'utilisateur
        if (strlen($json_obj['pwd']) >= 9) {
            $pwdhashed = password_hash($json_obj['pwd'], PASSWORD_BCRYPT, $options);
            $user->setPwd($pwdhashed);
        }
    }
    // ensuite, on peut modifier l'utilisateur dans la base de données
    echo json_encode($compareUser);
    $success = $userManager->modifyUser($user);
    if ($success === false) {
        http_response_code(400);
        echo "Updating failed";
        exit();
    } else {
        http_response_code(200);
        echo "User modified with Success";
        exit();
    }
}
