<?php

require_once(dirname(__FILE__) . '/./User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/./UserManager.php');
require_once(dirname(__FILE__) . '/../credentials.php');
require_once(dirname(__FILE__) . '/./UserInfos.class.php');

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

$user = new User();
$credentials = new Credentials();
$headers = getallheaders();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$regex = '/^la[0-9]{6}@student\.helha\.be$/i';
$pwdhashed = '';
$options = [
  'cost' => 12,
];
$userInfos = new UserInfos();

if (empty($headers['Authorization'])) {
  http_response_code(401);
  exit();
}

// Récupération des informations de l'utilisateur
if ($_SERVER['REQUEST_METHOD'] === 'GET'){
  $userInfos->setIsConnected($headers['Authorization'], $credentials);
  $userInfos->setIsAdmin($headers['Authorization'], $credentials);
  $userInfos->setInitials($headers['Authorization'], $credentials, $cnx);
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
  if ($json_obj['email'] == null || strlen($json_obj['email'])>50 || !preg_match($regex, $json_obj['email'])) {
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
  $userManager->saveUser($user);
  echo $credentials->createToken($user);
  // Deleting a User
} else if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
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