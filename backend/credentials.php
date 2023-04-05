<?php
use Firebase\JWT\JWT;
use Firebase\JWT\Key;
require_once('./vendor/autoload.php');
require_once('./env.php');
global $verySecretKey;
global $serverName;

require_once('./users/User.class.php');

if (empty($verySecretKey))
    exit;
if (empty($serverName))
    exit;

class Credentials {
    /**
     * This function extracts the JWT from the authorization header
     */
    private function extractToken($authHeader) {
        global $verySecretKey;
        if (empty($authHeader))
            return false;
        
        try {
            if (! preg_match('/Bearer\s(\S+)/', $authHeader, $matches))
                return false;

            return JWT::decode($matches[1], new Key($verySecretKey, 'HS512'));
        } catch (Throwable $th) {
            return false;
        }
    }

    /**
     * This function checks if the credentials belong to an admin
     */
    public function hasAdminCredentials($authorizationHeader) : bool {
        $userId = $this->extractUserId($authorizationHeader);
        require_once('./database/dbConnection.php');
        $dbConn = new dbConnection();
        
        $sqlQuery = "SELECT admin_user FROM users WHERE user_id = :userId";
        $statment = $dbConn->connect()->prepare($sqlQuery);
        $statment->execute([
            'userId' => $userId
        ]);
        $result = $statment->fetch();
        $dbConn->disconnect();
//        if ($result['admin_user'] == '1')
//            return true;
        return ($result['admin_user'] == '1');
    }

    /**
     * This function extracts the id of a user from the auth header
     */
    public function extractUserId($authorizationHeader) {
        global $serverName;
        $token = $this->extractToken($authorizationHeader);
        $now = new DateTimeImmutable();

        if ($token->iss !== $serverName ||
            $token->nbf > $now->getTimestamp() ||
            $token->exp < $now->getTimestamp() ||
            empty($token->userid)) {
            return null;
        }
        return $token->userid;
    }

    /**
     * This function creates a jwt for a particular user
     */
    public function createToken($user) {
        if (! ($user instanceof User))
            return null;

        global $verySecretKey;
        global $serverName;

        $issuedAt   = new DateTimeImmutable();
        $expire     = $issuedAt->modify('+2 hour')->getTimestamp();

        $data = [
            'iat'  => $issuedAt->getTimestamp(),         // Issued at: time when the token was generated
            'iss'  => $serverName,                       // Issuer (us)
            'nbf'  => $issuedAt->getTimestamp(),         // Not before
            'exp'  => $expire,                           // Expire
            'userid' => $user->getId(),                     // User name
        ];
        return JWT::encode(
            $data,
            $verySecretKey,
            'HS512'
        );
    }
}