<?php
require_once ("./users/User.class.php");
require_once("./credentials.php");
echo '<h1>test token</h1>';

//Creation of a token
$credsObj = new Credentials();
$user = new User();
$user->setId(69)
     ->setEmail("user@e.mail")
     ->setPwd("toshdkfhsdfhlekqgj")
     ->setPhoto("null")
     ->setFirstname("Loris")
     ->setLastname("Clement")
     ->setAdminStatus(1);

$token = $credsObj->createToken($user);
print($token);
print("<br>" . $credsObj->hasAdminCredentials("Bearer " . $token));
