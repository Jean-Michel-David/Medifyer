<?php

require_once(dirname(__FILE__) . '/../users/User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/../users/UserManager.php');

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
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$res = array();
$options = [
    'cost' => 12,
];

//modification du mdp
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Création du user : 
    $json_obj = json_decode(file_get_contents('php://input'), true);
    // on va le rechercher à partir de son adresse mail : 
    $res = $userManager->getUser($json_obj['email']);
        if ($res) {
            // on set les valeurs non modifiée
        $user->setId($res['user_id']);
        $user->setLastname($res['nom_user']);
        $user->setFirstname($res['prenom_user']);
        $user->setPhoto($res['pfp_user']);
        $user->setAdminStatus(($res['admin_user']));
        $user->setEmail($res['email_user']);
        $user->setActifUser($res['actif_user']);
        // on récupère ensuite le mot de passe entré dans le formulaire et on vérifie
        if ($json_obj['pwd'] != null) {
            if (strlen($json_obj['pwd']) >= 9) {
                $pwdhashed = password_hash($json_obj['pwd'], PASSWORD_BCRYPT, $options);
                $user->setPwd($pwdhashed);
            }
            // enfin, on modifie l'utilisateur
            if ($userManager->modifyUser($user)) {
                echo "Password modifyed with succes";
            }else {
                http_response_code(400);
                echo "Something went wrong";
                exit;
            }
            } else {
            http_response_code(400);
            echo "Entered Password is invalid";
            exit;
            }
    } else {
        http_response_code(400);
        echo "User doesn't exist";
        exit;
    }
}