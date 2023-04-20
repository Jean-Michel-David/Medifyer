<?php

require(dirname(__FILE__) . '/./User.class.php');
require(dirname(__FILE__) . '/../database/dbConnection.php');
require(dirname(__FILE__) . '/./UserManager.php');
require (dirname(__FILE__) . '/../credentials.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

$user = new User();
$credentials = new Credentials();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);
$regex = '/^la[0-9]{6}@student\.helha\.be$/i';
$pwdhashed = '';
$options = [
  'cost' => 12,
];

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
  $json_obj = json_decode(file_get_contents('php://input'), true);
  $userManager->getUser($json_obj['email']);
  return json_encode($user);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
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
  echo json_encode($user);
  return $credentials->createToken($user);
}
