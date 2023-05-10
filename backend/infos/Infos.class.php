<?php
class Infos {

    function getAllInfobulles() {
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');

        $db = new DBConnection();

        $sqlQuery = "SELECT libelle_info as label, texte_info as text
                    FROM `infos`
                    WHERE LOWER(libelle_info) LIKE LOWER('infobulle%')";

        $statement = $db->connect()->prepare($sqlQuery);
        $statement->execute();
        $infobulles = $statement->fetchAll();

        $db->disconnect();
        return $infobulles;
    }

    function getInfo(string $info) {
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');

        $db = new DBConnection();

        $sqlQuery = "SELECT libelle_info as label, texte_info as text
                    FROM `infos`
                    WHERE libelle_info = :libelle";

        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue('libelle', $_GET['getInfo']);
        $statement->execute();

        $infobulles = $statement->fetch();
        $db->disconnect();

        return $infobulles;
    }
}