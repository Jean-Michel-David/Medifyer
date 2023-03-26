<?php
//
//
//  How to verify the JWT in the Authorization header
//
//

//Headers for CORS and includes for the library
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once('vendor/autoload.php');

//Fetching the headers
$headers = getallheaders();

if (empty($headers['Authorization'])) {
//Debugging, should be replaced by a header status code Unauthorized
    print_r($headers);
    exit;
}

$jwt = $headers['Authorization'];
if (! $jwt) {
    // No token was able to be extracted from the authorization header
    // Not sure about this header
    header('HTTP/1.1 400 Bad Request');
    exit;
}

// TODO : store our secret key somewhere else, and generate a new one cause that one comes from a random website
$secretKey  = 'bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew=';

//Here I assume the jwt is in plain text in the header, but best practice would be for it to be right after a 'Bearer'.
// -> Header should be formatted like so, Authorization : Bearer fldksbgkjdshdkjqg/ffdksfds-vnkd937gdufsiuh (that's the JWT)
$token = JWT::decode($jwt, new Key($secretKey, 'HS512'));
$now = new DateTimeImmutable();
$serverName = "localhost.dstrens";

//Verifications that the token is valid
if ($token->iss !== $serverName ||
    $token->nbf > $now->getTimestamp() ||
    $token->exp < $now->getTimestamp())
{
    header('HTTP/1.1 401 Unauthorized');
    exit;
}

// Not sure about this header
header('HTTP/1.1 200');

// That's how we get the username. It could also be the id of our user, or both for maximum security.
echo "Connected as " . $token->userName;