<?php
use PHPUnit\Framework\TestCase;


require_once(dirname(__FILE__) . '/../admin/Admin.class.php');
require_once(dirname(__FILE__) . '/../question/QuestionManager.php');
require_once (dirname(__FILE__) . '/../database/dbConnection.php');

class AdminManagerTest extends TestCase
{
    private int $testUserId = 0;
    private QuestionManager $qu;
    private DBConnection $db;
    private array $usersToCreate;
    private int $adminId;
    public function __construct(string $name)
    {
        parent::__construct($name);
        $this->qu = new QuestionManager();
        $this->db = new DBConnection();
        $this->usersToCreate = [
            "testUser",  // Normal user
            "testUser2"  // Admin user
        ];
    }

    public function testBefore()
    {

        $conn = $this->db->connect();

        foreach ($this->usersToCreate as $user) {
            if ($this->qu->userExist($user, $conn)) {
                $this->assertTrue(true);
                continue;
            }

            $sql="INSERT INTO users(nom_user, prenom_user, psw_user, pfp_user, admin_user, email_user) 
                VALUES ('test', 'user', null, null, :isAdmin, :email)";

            $statement = $conn->prepare($sql);
            $statement->bindValue(':isAdmin', ($user != 'testUser'), PDO::PARAM_BOOL);
            $statement->bindValue(':email', $user);

            $statement->execute();

            $this->assertEquals(1, $statement->rowCount());
        }

        $this->testUserId = $this->qu->getIdFromEmail($this->usersToCreate[0], $conn);
        $this->adminId = $this->qu->getIdFromEmail($this->usersToCreate[1], $conn);

        $this->db->disconnect();
    }

    public function testAfter() {
        $conn = $this->db->connect();

        foreach ($this->usersToCreate as $user) {
            if (! $this->qu->userExist($user, $conn)) {
                $this->assertTrue(true);
                continue;
            }

            $statement = $conn->prepare("DELETE FROM users WHERE email_user = :email");
            $statement->bindValue(':email', $user);
            $statement->execute();

            $this->assertEquals(1, $statement->rowCount());
        }

        $this->db->disconnect();
    }
    public function testSetAdminStatus()
    {
        $this->testBefore();

        $strError = AdminManager::setAdminStatus($this->adminId, $this->testUserId, true);
        $this->assertEmpty($strError);

        $strError = AdminManager::setAdminStatus($this->adminId, $this->testUserId, false);
        $this->assertEmpty($strError);

        $this->testAfter();
    }

    public function testGetUserList()
    {
        
    }

    public function testGetUserSearches()
    {

    }

    public function testCommentQuestion()
    {

    }

    public function testSetInfobulles()
    {

    }

    public function testGetSharedUserSearches()
    {

    }
}
