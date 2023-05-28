<?php

require_once(dirname(__FILE__) . '/./User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/../credentials.php');
require_once(dirname(__FILE__) . '/./UserManager.php');

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

$headers = getallheaders();
$db = new DBConnection();
$cnx = $db->connect();
$userManager = new UserManager($cnx);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (empty($headers['Authorization'])) {
        http_response_code(401);
        exit();
    }
    // On récupère l'utilisateur à l'aide de son jwt
    $user = $userManager->getUserByID($headers['Authorization']);
    // on génère un code 
    $verifCode = rand(100000, 999999);
    // on l'insère ensuite dans la base de données 
    $userManager->sendVerificationCode($user, $verifCode);
    // maintenant on envoie le mail à l'adresse mail de l'utilisateur
    $to = $user->getEmail();
    $subject = "Vérification du code";
    $message = "Si vous avez reçu ce mail par erreur, veuillez ignorer ce mail.
                Votre code de Vérification est " . $verifCode;
    $header = "From: medifyer.test.verif@gmail.com";
    mail($to, $subject, $message, $header);
    $response = array("succes" => true, "message" => "Succes");
    echo json_encode($response);
}