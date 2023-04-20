<?php
require_once("./users/User.class.php");
require_once("./credentials.php");
require_once("./admin/Admin.class.php");
echo '<h1>test token</h1>';

//Creation of a token
$credsObj = new Credentials();
$user = new User();
$user->setId(1)
     ->setEmail("user@e.mail")
     ->setPwd("toshdkfhsdfhlekqgj")
     ->setPhoto("null")
     ->setFirstname("Loris")
     ->setLastname("Clement")
     ->setAdminStatus(1);

$token = $credsObj->createToken($user);
$user->setId(2);
$secondToken = $credsObj->createToken($user);
print('<br> First token (admin): ' . $token);

$hasTheCredentials = ($credsObj->hasAdminCredentials("Bearer " . $token)) ? "yes" : "no";
print("<br>First : " . $hasTheCredentials . "<br>");

$hasTheCredentials = ($credsObj->hasAdminCredentials("Bearer " . $secondToken)) ? "yes" : "no";
print("<br>Second : " . $hasTheCredentials. "<br>");

print_r(
    AdminManager::getUserList("Bearer " . $token, "", 0)
);

print('<br><br>');
print_r(AdminManager::getUserSearches("Bearer " . $token, 1));