<?php

class UserManager
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function getUser($id)
  {
    $sql="SELECT user_id, nom_user, prenom_user, psw_user, pfp_user, admin_user, email_user from users WHERE user_id=:id";
    $result = array();
    try {
      $select = $this->db->prepare($sql);
      $select->execute(array('id'=>$id));
      $result = $select->fetch(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
      die($e);
    } finally {
      $select->closeCursor();
    }
    return $result;
  }

  /**
  @Description insert an user in the database using data encoded in the registration form.
  **/
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
}
