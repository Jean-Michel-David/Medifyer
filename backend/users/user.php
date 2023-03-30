<?php

require('User.class.php');
require('../database/dbConnection.php');
require('UserManager.php');

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: content-type");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

$userManager = new UserManager($db);
$regex = '/la[0-9]{6}@student\.helha\.be/';
$pwdhashed = '';
$options = [
  'cost' => 12,
];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $json_obj = json_decode(file_get_contents('php://input'), true);
  $user = new User();
  $user->setId($json_obj['id']);
  if ($json_obj['firstname'] != null && strlen($json_obj['firstname'])<50) {
    $user->setFirstname($json_obj['firstname']);
  }else{
    http_response_code(400);
    "Prénom Invalide ! ";
  }
  if ($json_obj['lastname'] != null & strlen($json_obj['lastname'])<50) {
    $user->setLastname($json_obj['lastname']);
  } else {
    http_response_code(400);
    echo "Nom Invalide ! ";
  }
  if ($json_obj['email'] != null && strlen($json_obj['email'])<50 && preg_match($regex, $json_obj['email'])) {
    $user->setEmail($json_obj['email']);
  } else {
    http_response_code(400);
    echo "Email Invalide !";
  }
  if($json_obj['pwd'] != null){
  $pwdhashed = password_hash($json_obj['pwd'], PASSWORD_BCRYPT, $options);
    $user->setPwd($pwdhashed);
  } else {
    http_response_code(400);
    echo "Mot de passe Invalide";
  }
  $user->setPhoto($json_obj['photo']);
  $userManager->saveUser($user);
  echo json_encode($user);
}
