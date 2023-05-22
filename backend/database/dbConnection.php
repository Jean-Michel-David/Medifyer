<?php
class DBConnection
{
    private $db;
    private $dbName = "medifyer";
    private $user = "root";
    private $psw = "";

  function connect() : PDO
  {
    try {
        $this->db = new PDO(
            'mysql:host=localhost;dbname=' . $this->dbName . ';charset=utf8mb4',
            $this->user,
            $this->psw,
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            ],
        );
    } catch (PDOException $e) {
      $msg = 'ERREUR PDO dans ' . $e->getFile() . ' Ligne : ' . $e->getLine() . ' : ' . $e->getMessage();
      die($msg);
    }
    return $this->db;
  }

  function disconnect() : void
  {
    $this->db = null;
  }
}