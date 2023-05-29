<?php
use PHPUnit\Framework\TestCase;
require_once '../vendor/autoload.php';

use GuzzleHttp\Client as HttpClient;

require_once('../database/dbConnection.php');
require_once('../question/Question.class.php');
require_once('../question/QuestionManager.php');
require_once('../users/UserManager.php');
class QuestionManagerTest extends TestCase
{
    private Question $question;
    private QuestionManager $qu;
    private DBConnection $db;
    private UserManager $userManager;
    private $credentials;
    private string $token;
    private User $user;
    public function __construct(string $name)
    {
        parent::__construct($name);
        $this->qu = new QuestionManager();
        $this->db = new DBConnection();
        $this->userManager = new UserManager($this->db->connect());
        $this->user = new User();
        $this->question = new Question();
        $this->credentials = new Credentials();;
    }
    protected function setUp(): void
    {
        $sql = "INSERT INTO `users`(`nom_user`, `prenom_user`, `psw_user`, `pfp_user`, `admin_user`, `email_user`, `actif_user`) 
                VALUES ('nom','prenom','mot de passe','pfp',0,'email',1)";
        $statement = $this->db->connect()->prepare($sql);
        $statement->execute();
        $this->assertEquals(1, $statement->rowCount());

        $res = $this->userManager->getUser('email');
        $this->user->setId($res['user_id'])
            ->setLastname($res['nom_user'])
            ->setFirstname($res['prenom_user'])
            ->setPwd($res['psw_user'])
            ->setPhoto($res['pfp_user'])
            ->setAdminStatus(($res['admin_user']))
            ->setEmail($res['email_user']);
        $this->token = $this->credentials->createToken($this->user);
    }
    protected function tearDown(): void
    {
        $this->userManager->deleteUser("Bearer ".$this->token);
    }
    /**
     * @throws \GuzzleHttp\Exception\GuzzleException
     */
    public function testSauvegardeQuestion(): void
    {
        $question = new Question();
        $question->setId(0)
            ->setAcces(1)
            ->setCommentaires("commentaires")
            ->setCoWorkers("")
            ->setQuestion("Ma question");
        $reponse = $this->qu->saveQuestion($question,$this->db->connect(),"Bearer ".$this->token);
        $this->assertTrue($reponse);

        $question = $this->qu->getUserSearches($this->db->connect(),"Bearer ".$this->token);
        $this->qu->deleteQuestion($question[0],$this->db->connect(),"Bearer ".$this->token);

        $this->db->disconnect();
    }
    public function testGetUserSearches():void{
        $question = new Question();
        $question->setId(0)
            ->setAcces(1)
            ->setCommentaires("commentaires")
            ->setCoWorkers("")
            ->setQuestion("Ma question");
        $this->qu->saveQuestion($question,$this->db->connect(),"Bearer ".$this->token);
        $question = $this->qu->getUserSearches($this->db->connect(),"Bearer ".$this->token);

        $this->assertNotNull($question);

        $this->qu->deleteQuestion($question[0],$this->db->connect(),"Bearer ".$this->token);
        $this->db->disconnect();
    }

    public function testDeleteUser():void{
        $question = new Question();
        $question->setId(0)
            ->setAcces(1)
            ->setCommentaires("commentaires")
            ->setCoWorkers("")
            ->setQuestion("Ma question");
        $this->qu->saveQuestion($question,$this->db->connect(),"Bearer ".$this->token);
        $question = $this->qu->getUserSearches($this->db->connect(),"Bearer ".$this->token);

        $reponse = $this->qu->deleteQuestion($question[0],$this->db->connect(),"Bearer ".$this->token);

        $this->assertTrue($reponse);

        $this->db->disconnect();
    }

    public function testGetSharedUserSearches():void{
        $sql = "INSERT INTO `users`(`nom_user`, `prenom_user`, `psw_user`, `pfp_user`, `admin_user`, `email_user`, `actif_user`) 
                VALUES ('nom','prenom','mot de passe','pfp',0,'email2',1)";
        $statement = $this->db->connect()->prepare($sql);
        $statement->execute();
        $this->assertEquals(1, $statement->rowCount());

        $res = $this->userManager->getUser('email2');
        $this->user->setId($res['user_id'])
            ->setLastname($res['nom_user'])
            ->setFirstname($res['prenom_user'])
            ->setPwd($res['psw_user'])
            ->setPhoto($res['pfp_user'])
            ->setAdminStatus(($res['admin_user']))
            ->setEmail($res['email_user']);
        $token2 = $this->credentials->createToken($this->user);

        $question = new Question();
        $question->setId(0)
            ->setAcces(1)
            ->setCommentaires("commentaires")
            ->setCoWorkers(["email2"])
            ->setQuestion("Ma question");
        $this->qu->saveQuestion($question,$this->db->connect(),"Bearer ".$this->token);
        $reponse = $this->qu->getSharedSearches($this->db->connect(),$token2);
        $this->assertNotNull($reponse);

        $this->userManager->deleteUser("Bearer ".$token2);

        $this->db->disconnect();
    }

    public function testGetQuestion():void{
        $question = new Question();
        $question->setId(0)
            ->setAcces(1)
            ->setCommentaires("commentaires")
            ->setCoWorkers(["email2"])
            ->setQuestion("Ma question");
        $this->qu->saveQuestion($question,$this->db->connect(),"Bearer ".$this->token);
        $questions = $this->qu->getUserSearches($this->db->connect(),"Bearer ".$this->token);

        $reponse = $this->qu->getQuestion($questions[0]['id'],$this->db->connect(),"Bearer ".$this->token);

        $this->assertNotNull($reponse);

        $this->db->disconnect();
    }
}
