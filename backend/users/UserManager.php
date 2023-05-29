<?php

use SebastianBergmann\CodeCoverage\Driver\Selector;

require_once(dirname(__FILE__) . '/../credentials.php');
class UserManager
{
  private PDO $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  /**
  @Description Function that get users data from the database.
   */
  public function getUser($email)
  {
    $sql="SELECT * from users WHERE email_user=:email";
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
    $sql="INSERT IGNORE INTO users(nom_user, prenom_user, psw_user, pfp_user, admin_user, email_user) VALUES (:nom_user, :prenom_user, :psw_user, :pfp_user, :admin_user, :email_user)";
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
      if ($insert->rowCount()<1) {
        http_response_code(400);
        echo "Echec de l'insertion en base de données";
        exit();
      }
    } catch (PDOException $e) {
      http_response_code(400);
      echo "Erreur lors de la sauvegarde en base de données";
      exit();
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
     $stmnt1->closeCursor();
     // suppressions de toutes les recherches
      foreach($recherches as $res){
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
        $stmnt2->bindValue('recherche_id', $res['recherche_id']);
        $stmnt2->execute();
        $stmnt2->closeCursor();
      }
      // Suppression de l'utilisateur
      $sqlDeleteUser = " DELETE FROM aaccesa where user_id = :user_id;
                        DELETE FROM users WHERE user_id = :user_id;";
      $stmnt3 = $this->db->prepare($sqlDeleteUser);
      $stmnt3->bindValue('user_id', $user_id);
      if ($stmnt3->execute()) {
        $stmnt3->closeCursor();
        return true;
      } else {
        $stmnt3->closeCursor();
        return false;
      }
    } catch (PDOException $e) {
      die($e);
    }
  }

  /**
  @Description Function that get users data from the database, using the user ID
   */
  public function getUserByID($authorization)
  {
    $userCreds = new Credentials();
    $sql="SELECT * from users WHERE user_id=:id";
    $result = array();
    $user_id = $userCreds->extractUserId($authorization);
    try {
      $select = $this->db->prepare($sql);
      $select->execute(array('id'=>$user_id));
      $result = $select->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      die($e);
    } finally {
      $select->closeCursor();
    }
    return $result;
  }

  /**
   @Description : Function modifying the user in the database
   */
  public function modifyUser(User $user) {
    $sql="UPDATE users SET user_id =:user_id, nom_user=:nom_user, prenom_user=:prenom_user, psw_user=:psw_user, pfp_user=:pfp_user, admin_user=:admin_user,email_user=:email_user, actif_user=:actif_user WHERE user_id=:user_id";
    try {
      $insert = $this->db->prepare($sql);
      $params = array (
        'user_id' => $user->getId(),
        'nom_user' => $user->getLastname(),
        'prenom_user' => $user->getFirstname(),
        'psw_user' => $user->getPwd(),
        'pfp_user' => $user->getPhoto(),
        'admin_user' => $user->isAdmin(),
        'email_user' => $user->getEmail(),
        'actif_user' => $user->getActifUser()

      );
      if($insert->execute($params)){
        return true;
      } else {
        return false;
      }

    } catch(PDOException $e) {
      die($e);
    } finally {
      $insert->closeCursor();
    }
  }

  public function sendVerificationCode(User $user, $code) {
    $sql = "UPDATE users SET code_user = :code_user WHERE email_user = :email_user";
    try {
      $insert = $this->db->prepare($sql);
      $params = array (
        'email_user' => $user->getEmail(),
        'code_user' => $code
      );
      if($insert->execute($params)) {
        return true;
      } else {
        return false;
      }
    } catch (PDOException $e) {
      die($e);
    } finally {
      $insert->closeCursor();
    }
  }

  public function checkVerificationCode($code) {
    $sql = "SELECT * FROM `users` WHERE code_user = :code_user";
    try {
      $insert = $this->db->prepare($sql);
      $params = array (
        'code_user' => $code
      );
      $insert->execute($params);
      $result = $insert->fetch(PDO::FETCH_ASSOC);
    } catch(PDOException $e) {
      die($e);
      exit;
    } finally {
      return $result;
    }
  }
  
}
