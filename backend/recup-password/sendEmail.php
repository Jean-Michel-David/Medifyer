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

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // On récupère l'utilisateur à l'aide de son email
    $emailRecu = file_get_contents('php://input');
    $res = $userManager->getUser($emailRecu);
    $user->setId($res['user_id']);
    $user->setLastname($res['nom_user']);
    $user->setFirstname($res['prenom_user']);
    $user->setPwd($res['psw_user']);
    $user->setPhoto($res['pfp_user']);
    $user->setAdminStatus(($res['admin_user']));
    $user->setEmail($res['email_user']);
    // on génère un code 
    $verifCode = rand(100000, 999999);
    // on l'insère ensuite dans la base de données 
    $userManager->sendVerificationCode($user, $verifCode);
    try {
        // Paramètres SMTP :
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'medifyer.test.verif@gmail.com';
        $mail->Password = 'edebqmlernwmevye';
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;
        // Paramètres du mail :
        $mail->setFrom('medifyer.test.verif@gmail.com');
        $mail->addAddress($user->getEmail());
        $mail->Subject ="Code de verification";
        $mail->Body = 'Votre code de verification est : ' . $verifCode;
        $mail->send();
        $response = array("success" => true, "message" => "E-mail de verification envoye avec succes !");
        echo json_encode($response);
    } catch (Exception $e) {
        die($e);
        $response = array("success" => false, "message" => "Une erreur s'est produite lors de l'envoi de l'e-mail.");
        echo json_encode($response);
    }
}