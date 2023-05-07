<?php

require(dirname(__FILE__) . '/../database/dbConnection.php');
require(dirname(__FILE__) . '/../credentials.php');

header("Access-Control-Allow-Origin: ");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization");
header("Access-Control-Allow-Methods: GET,POST,PUT,DELETE");

$db = new DBConnection();
$cnx = $db->connect();
$userCreds = new Credentials();
// on va d'abord extraire l'id de l'utilisateur
