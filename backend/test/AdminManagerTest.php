<?php
use PHPUnit\Framework\TestCase;


require_once(dirname(__FILE__) . '/../admin/Admin.class.php');
require_once(dirname(__FILE__) . '/../question/QuestionManager.php');
require_once (dirname(__FILE__) . '/../database/dbConnection.php');

class AdminManagerTest extends TestCase
{
    private int $testUserId;
    private int $adminId;

    private $questionId;
    private QuestionManager $qu;
    private DBConnection $db;
    private array $usersToCreate;
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

    private function hasQuestionUser(int $id, PDO $conn) : bool {
        $conn = $this->db->connect();

        $statement = $conn->prepare("SELECT * FROM recherches WHERE user_id = :userId");
        $statement->execute(["userId" => $id]);

        return ($statement->rowCount() > 0);

    }

    public function setUp() : void
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

        if (!$this->hasQuestionUser($this->testUserId, $conn)) {
            $statement = $conn->prepare("INSERT INTO `recherches` (`recherche_id`, `question_rech`, `population_rech`, `traitement_rech`, `resultat_rech`, `public_rech`, `commentaire_rech`, `lastUpdate`, `user_id`) 
                                                                VALUES  (NULL, 'Test question', NULL, NULL, NULL, NULL, NULL, current_timestamp(), :userId);");
            $statement->execute(['userId' => $this->testUserId]);
        }
        $this->assertTrue($this->hasQuestionUser($this->testUserId, $conn));

        $statement = $conn->prepare("SELECT recherche_id FROM recherches WHERE user_id = :userId");
        $statement->execute(['userId' => $this->testUserId]);
        $this->questionId = $statement->fetch()['recherche_id'];

        $this->db->disconnect();
    }

    public function tearDown() : void {
        $conn = $this->db->connect();

        if ($this->hasQuestionUser($this->testUserId, $conn)) {
            $statement = $conn->prepare("DELETE FROM recherches WHERE user_id = :userId");
            $statement->execute([':userId' => $this->testUserId]);
        }
        $this->assertFalse($this->hasQuestionUser($this->testUserId, $conn));

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
        $strError = AdminManager::setAdminStatus($this->adminId, $this->testUserId, true);
        $this->assertEmpty($strError);

        $strError = AdminManager::setAdminStatus($this->adminId, $this->testUserId, false);
        $this->assertEmpty($strError);
    }

    function testCommentQuestion()
    {
        $this->assertTrue(AdminManager::commentQuestion("commentaire test", $this->questionId));
    }

    public function testSetInfobulles()
    {
        $conn = $this->db->connect();

        $statement = $conn->prepare("DELETE FROM infos WHERE libelle_info = 'info_test'");
        $statement->execute();
        
        $statement = $conn->prepare("INSERT INTO `infos` (`Id_Info`, `libelle_info`, `texte_info`) 
                                                        VALUES (NULL, 'info_test', NULL);");
        $statement->execute();

        AdminManager::setInfobulles('info_test', 'testInfobulle');
        $statement = $conn->prepare("SELECT * FROM infos WHERE libelle_info = 'info_test'");
        $statement->execute();
        $this->assertEquals("testInfobulle", $statement->fetch()['texte_info']);

        $statement = $conn->prepare("DELETE FROM infos WHERE libelle_info = 'info_test'");
        $statement->execute();
    }
}
