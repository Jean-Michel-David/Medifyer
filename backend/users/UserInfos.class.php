<?php

class UserInfos implements JsonSerializable{
  
    private $isConnected;
    private $isAdmin;
    private $initials;

    public function __construct()
    {
        $this->isConnected = false;
        $this->isAdmin = false;
        $this->initials = "";
    }

    /**
     * This function checks if the jwt in the header has an existing user_id in the database, to see if the user is connected or not
     */
    public function setIsConnected($authorization, $credentials) {
        if ($credentials->extractUserId($authorization) !== null) {
          $this->isConnected = "true";
        } else {
          $this->isConnected = "false";
        }
    }

    /**
     * This function checks if the user is an admin or not, an send a boolean to the isAdmin object variable
     */
    public function setIsAdmin($authorization, $credentials) {
        if ($credentials->hasAdminCredentials($authorization)) {
          $this->isAdmin = "true";
        } else {
          $this->isAdmin = "false";
        }
    }

    /**
     * This function return the initials of a user
     */
    public function setInitials($authorization, $credentials, $cnx) {
        $id = $credentials->extractUserId($authorization);
        $sql = "SELECT nom_user ,prenom_user FROM users WHERE user_id=:user_id";
        $stmnt = $cnx->prepare($sql);
        $stmnt->bindValue('user_id', $id);
        $stmnt->execute();
        $res = $stmnt->fetch(PDO::FETCH_ASSOC);
        $firstnameInitial = substr($res["prenom_user"],0,1);
        $lastnameInitial = substr($res["nom_user"],0,1);
        $this->initials = $firstnameInitial." ".$lastnameInitial;
    }

    public function getIsConnected() {
      return $this->isConnected;
    }

    public function getIsAdmin() {
      return $this->isAdmin;
    }

    public function getInitials() {
      return $this->initials;
    }

    public function jsonSerialize(): mixed {
      return array(
      'isConnected' => $this->getIsConnected(),
      'isAdmin' => $this->getIsAdmin(),
      'initials' => $this->getInitials()
      );
    }
}