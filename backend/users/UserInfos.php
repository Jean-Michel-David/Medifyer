<?php

class UserInfos {
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
    public function getIsConnected($authorization, $credentials) {
        $this->isConnected = ($credentials->extarctUserId($authorization) != null);
    }

    /**
     * This function checks if the user is an admin or not, an send a boolean to the isAdmin object variable
     */
    public function getIsAdmin($authorization, $credentials) {
        $this->isAdmin = $credentials->hasAdminCredentials($authorization);
    }

    /**
     * This function return the initials of a user
     */
    public function getInitials($authorization, $credentials, $cnx) {
        $id = $credentials->extractUserId($authorization);
        $sql = "SELECT nom_user ,prenom_user WHERE user_id=:user_id";
        $stmnt = $cnx->prepare($sql);
        $stmnt->bindValue('user_id', $id);
        $stmnt->execute();
        $res = $stmnt->fetchAll(PDO::FETCH_ASSOC);
        $firstnameInitial = substr($res['prenom_user'],0);
        $lastnameInitial = substr($res['nom_user'],0);
        $this->initials = $firstnameInitial + " " + $lastnameInitial;
    }
}