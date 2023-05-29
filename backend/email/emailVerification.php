<?php

require_once(dirname(__FILE__) . '/../env.php');

global $authorizedURL;
header('Access-Control-Allow-Origin: ' . $authorizedURL);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
// If this is a preflight request, respond with the appropriate headers and exit
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE');
    header('Access-Control-Allow-Headers: Content-Type, Authorization');
    exit;
}

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once(dirname(__FILE__) . '/../users/User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/../credentials.php');
require_once(dirname(__FILE__) . '/../users/UserManager.php');
require_once(dirname(__FILE__) . '/../phpmailer/src/Exception.php');
require_once(dirname(__FILE__) . '/../phpmailer/src/PHPMailer.php');
require_once(dirname(__FILE__) . '/../phpmailer/src/SMTP.php');

$mail = new PHPMailer(true);
$user = new User();
$headers = getallheaders();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);


// Vérification du code 
if($_SERVER['REQUEST_METHOD'] === 'POST') {
    $codeRecu = file_get_contents('php://input');
    // on test si le code envoyé est bien correct 
    // pour se faire, on va recréer le user à partir des infos qu'on va aller chercher dans la base de données;
    $res = $userManager->checkVerificationCode($codeRecu);
    $res;
    if ($res) {
        // dans le cas où le ccode est correct, on reconstruit l'utilisateur à partir des données récupérée
        $user->setId($res['user_id']);
        $user->setLastname($res['nom_user']);
        $user->setFirstname($res['prenom_user']);
        $user->setPwd($res['psw_user']);
        $user->setPhoto($res['pfp_user']);
        $user->setAdminStatus(($res['admin_user']));
        $user->setEmail($res['email_user']);
        // et on active le compte
        $user->setActifUser(1);
        // on modifie l'utilisateur dans la base de données 
        $userManager->modifyUser($user);
        $response = array("success" => true, "message" => "Code de verification valide !");
        echo json_encode($response);
    } else {
        $response = array("success" => false, "message" => "Code de verification invalide !");
        echo json_encode($response);
    }
}