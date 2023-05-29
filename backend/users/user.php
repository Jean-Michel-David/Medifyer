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

require_once(dirname(__FILE__) . '/./User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/./UserManager.php');
require_once(dirname(__FILE__) . '/../credentials.php');
require_once(dirname(__FILE__) . '/./UserInfos.class.php');
require_once(dirname(__FILE__) . '/../phpmailer/src/Exception.php');
require_once(dirname(__FILE__) . '/../phpmailer/src/PHPMailer.php');
require_once(dirname(__FILE__) . '/../phpmailer/src/SMTP.php');

$mail = new PHPMailer(true);
$user = new User();
$credentials = new Credentials();
$headers = getallheaders();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$regexStudent = '/^la[0-9]{6}@student\.helha\.be$/i';
$regexTeacher = '/^\w+@helha\.be$/i';
$pwdhashed = '';
$options = [
  'cost' => 12,
];
$userInfos = new UserInfos();

// Récupération des informations de l'utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
  if (empty($headers['Authorization'])) {
    http_response_code(401);
    exit();
  }
  $userInfos->setIsConnected($headers['Authorization'], $credentials);
  $userInfos->setIsAdmin($headers['Authorization'], $credentials);
  $userInfos->setNames($headers['Authorization'], $credentials, $cnx);
  echo json_encode($userInfos);
}
// Inscription de l'utilisateur
else if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
  if ($json_obj['email'] == null || strlen($json_obj['email'])>50 || !preg_match($regexStudent, $json_obj['email']) || !preg_match($regexTeacher, $json_obj['email'])) {
    http_response_code(400);
    echo "Email Invalide !";
    exit;
  }
  if($json_obj['pwd'] == null){
    http_response_code(400);
    echo "Mot de passe Invalide";
    exit;
  }
  $pwdhashed = password_hash($json_obj['pwd'], PASSWORD_BCRYPT, $options);
  $user->setFirstname($json_obj['firstname']);
  $user->setLastname($json_obj['lastname']);
  $user->setEmail($json_obj['email']);
  $user->setPwd($pwdhashed);
  $user->setPhoto($json_obj['photo']);
  if (preg_match($regexTeacher, $json_obj['email'])) {
    $user->setAdminStatus(true);
  }
  $userManager->saveUser($user);
  // une fois l'utilisateur inscrit dans la base de données ,on envoie un mail avec un code de vérification :
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
    $mail->Subject = "Verification de l'email";
    $mail->Body = 'Votre code de verification est : ' . $verifCode;

    $mail->send();
  } catch (Exception $e) {
    die($e);
    exit;
  } finally {
    echo $credentials->createToken($user);
  }
  
  // Deleting a User
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
  if (empty($headers['Authorization'])) {
    http_response_code(401);
    exit();
  }  
  $succes = $userManager->deleteUser($headers['Authorization']);
  if ($succes == false) {
    http_response_code(400);
    exit();
  } else {
    http_response_code(200);
    echo "User deleted with Succes";
    exit();
  }
}