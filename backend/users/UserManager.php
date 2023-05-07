<?php

class UserManager
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
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
}
