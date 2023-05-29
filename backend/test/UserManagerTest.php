<?php

use PHPUnit\Framework\TestCase;

require_once (dirname(__FILE__) . '/../users/User.class.php');
require_once(dirname(__FILE__) . '/../database/dbConnection.php');
require_once(dirname(__FILE__) . '/../users/UserManager.php');
require_once(dirname(__FILE__) . '/../credentials.php');

class UserManagerTest extends TestCase
{
    private User $user;
    private DBConnection $db;
    private UserManager $userManager;
    private string $token;
    private Credentials $credentials;

    public function __construct(string $name)
    {
        parent::__construct($name);
        $this->user = new User();
        $this->db = new DBConnection();
        $cnx = $this->db->connect();
        $this->userManager = new UserManager($cnx);
        $this->credentials = new Credentials();
    }
    public function setUp(): void{
        $this->user->setId(1);
        $this->user->setLastname("Test_nom");
        $this->user->setFirstname("Test_prenom");
        $this->user->setPwd("123456789");
        $this->user->setEmail("la000000@student.helha.be");
        $this->user->setPhoto(null);
    }

    public function testSaveUser() {
        $this->userManager->saveUser($this->user);
        $userCompare = $this->userManager->getUser($this->user->getEmail());
        $this->user->setId($userCompare['user_id']);
        $this->token=$this->credentials->createToken($this->user);
        $this->assertEquals("la000000@student.helha.be", $userCompare['email_user']);
    }

    public function testGetUser() {
        $userCompare = $this->userManager->getUser($this->user->getEmail());
        $this->assertEquals("la000000@student.helha.be", $userCompare['email_user']);
    }
    public function testGetUserById() {
        $userCompare = $this->userManager->getUser($this->user->getEmail());
        $this->user->setId($userCompare['user_id']);
        $this->token=$this->credentials->createToken($this->user);
        $userCompare = $this->userManager->getUserByID('Bearer '.$this->token);
        $this->assertEquals("la000000@student.helha.be", $userCompare['email_user']);
    }

    public function testModifyUser(){
        $userCompare = $this->userManager->getUser($this->user->getEmail());
        $this->user->setId($userCompare['user_id']);
        $this->user->setFirstname("Test_prenom_modifié");
        $this->assertTrue($this->userManager->modifyUser($this->user));
    }

    public function testDeleteUser(){
        $userCompare = $this->userManager->getUser($this->user->getEmail());
        $this->user->setId($userCompare['user_id']);
        $this->token=$this->credentials->createToken($this->user);
        $this->assertTrue($this->userManager->deleteUser('Bearer '.$this->token));
    }
}