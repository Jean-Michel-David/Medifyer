<?php

class UserInfos implements JsonSerializable{
  
    private $isConnected;
    private $isAdmin;
    private $names;

    public function __construct()
    {
        $this->isConnected = false;
        $this->isAdmin = false;
        $this->names = "";
    }

    /**
     * This function checks if the jwt in the header has an existing user_id in the database, to see if the user is connected or not
     */
    public function setIsConnected($authorization, $credentials) {
        if ($credentials->extractUserId($authorization) !== null) {
          $this->isConnected = true;
        } else {
          $this->isConnected = false;
        }
    }

    /**
     * This function checks if the user is an admin or not, an send a boolean to the isAdmin object variable
     */
    public function setIsAdmin($authorization, $credentials) {
        if ($credentials->hasAdminCredentials($authorization)) {
          $this->isAdmin = true;
        } else {
          $this->isAdmin = false;
        }
    }

    /**
     * This function return the names of a user
     */
    public function setNames($authorization, $credentials, $cnx) {
        $id = $credentials->extractUserId($authorization);
        $sql = "SELECT nom_user ,prenom_user FROM users WHERE user_id=:user_id";
        $stmnt = $cnx->prepare($sql);
        $stmnt->bindValue('user_id', $id);
        $stmnt->execute();
        $res = $stmnt->fetch(PDO::FETCH_ASSOC);
        $firstname = $res["prenom_user"];
        $lastname = $res["nom_user"];
        $this->names = $firstname." ".$lastname;
    }

    public function getIsConnected() {
      return $this->isConnected;
    }

    public function getIsAdmin() {
      return $this->isAdmin;
    }

    public function getNames() {
      return $this->names;
    }

    public function jsonSerialize(): mixed {
      return array(
      'isConnected' => $this->getIsConnected(),
      'isAdmin' => $this->getIsAdmin(),
      'names' => $this->getNames()
      );
    }
}