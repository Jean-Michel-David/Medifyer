<?php
require_once(dirname(__FILE__) . '/../credentials.php');
class UserManager
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  /**
  @Description Function that get users data from the database.
   */
  public function getUser($email)
  {
    $sql="SELECT user_id, nom_user, prenom_user, psw_user, pfp_user, admin_user, email_user from users WHERE email_user=:email";
    $result = array();
    try {
      $select = $this->db->prepare($sql);
      $select->execute(array('email'=>$email));
      $result = $select->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      die($e);
    } finally {
      $select->closeCursor();
    }
    return $result;
  }
  /**
    @Description Function that insert an user in the database using data encoded in the registration form.
  */
  public function saveUser(User $user)
  {
    $sql="INSERT INTO users(nom_user, prenom_user, psw_user, pfp_user, admin_user, email_user) VALUES (:nom_user, :prenom_user, :psw_user, :pfp_user, :admin_user, :email_user)";
    if ($user->getId()>0) {
      echo "Déjà inscrit";
    }
    try {
      $insert = $this->db->prepare($sql);
      $params = array (
        'nom_user' => $user->getLastname(),
        'prenom_user' => $user->getFirstname(),
        'psw_user' => $user->getPwd(),
        'pfp_user' => $user->getPhoto(),
        'admin_user' => false,
        'email_user' => $user->getEmail(),
      );
      $insert->execute($params);
    } catch (PDOException $e) {
      die($e);
    } finally {
      $insert->closeCursor();
    }
  }
  /**
   @Desctription Function that delete a User 
   */
  public function deleteUser($authorization)
  {
    $userCreds = new Credentials();
    $user_id = $userCreds->extractUserId($authorization);
    try {
     // on doit d'abord rechercher les recherches effectuées par l'utilisateur : 
     $sqlGetSearches = "SELECT recherche_id FROM recherches where user_id = :user_id";
     $stmnt1 = $this->db->prepare($sqlGetSearches);
     $stmnt1->bindValue('user_id', $user_id);
     $stmnt1->execute();
     $recherches = $stmnt1->fetchAll(PDO::FETCH_ASSOC);
     // suppressions de toutes les recherches
      foreach($recherches as $recherche_id){
        $sqlDeleteSearches = "DELETE FROM equation
        WHERE terme_id IN (
          SELECT terme_id
          FROM termes
          WHERE recherche_id = :recherche_id
        );
        
        DELETE FROM termes WHERE recherche_id = :recherche_id;
        DELETE from aaccesa where recherche_id = :recherche_id;
        DELETE FROM recherches WHERE recherche_id = :recherche_id;";

        $stmnt2 = $this->db->prepare($sqlDeleteSearches);
        $stmnt2->bindValue('recherche_id', $recherche_id);
        $stmnt2->execute();
      }
      // Suppression de l'utilisateur
      $sqlDeleteUser = "DELETE FROM users WHERE user_id = :user_id;";
      $stmnt3 = $this->db->prepare($sqlDeleteUser);
      $stmnt3->bindValue('user_id', $user_id);
      if ($stmnt3->execute()) {
        return true;
      } else {
        return false;
      }
    } catch (PDOException $e) {
      die($e);
    }
  }
}
