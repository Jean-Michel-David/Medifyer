<?php
require (dirname(__FILE__) . '/./database/dbConnection.php');

Class Request {

    private $db;

    public function __construct($db)
    {
        $this->db = $db;
    }
// Function that delete a personal request from a user, using the request id. Return true if the delete succeed or false if it failed
// need to delete terms and equation as well but don't know in which order yet. 
    public function deletePersonalRequest(string $id)
    {
        $sql=" DELETE * from recherches where recherche_id=:id ";
        try {
            $delete = $this->db->prepare($sql);
            $result = $delete->execute(array('id'=>$id));
        } catch (PDOException $e) {
            die($e);
        } finally {
            $delete->closeCursor();
        }
        return $result;        
    }
}
