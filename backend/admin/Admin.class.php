<?php
require_once(dirname(__FILE__) . '/../credentials.php');

class AdminManager {
    public static function getUserList($creds, string $parameters, int $page, int $usersByPage = 10) {
        //Verify credentials
        $credentials = new Credentials();
        //if (!$credentials->hasAdminCredentials($creds))
        //    return false;

        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();

        //Actual query
        $sqlQuery = " SELECT user_id as id, nom_user as nom, prenom_user as prenom, email_user as email, pfp_user as pfp, admin_user as isAdmin 
                     FROM `users`
                     WHERE LOWER(nom_user) LIKE LOWER(:searchString)
                        OR LOWER(prenom_user) LIKE LOWER(:searchString)
                        OR LOWER(email_user) LIKE LOWER(:searchString)
                     ORDER BY nom_user, prenom_user
                     LIMIT :startUser, :numberOfUsers;";

        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue('searchString','%' . $parameters . '%');
        $statement->bindValue('startUser', ($page - 1) * $usersByPage, PDO::PARAM_INT);
        $statement->bindValue('numberOfUsers', $usersByPage, PDO::PARAM_INT);

        $statement->execute();

        $users = $statement->fetchAll();
        $db->disconnect();

        return $users;
    }

    public static function getUserSearches($creds, string $userId) {
        //Verify credentials
        $credentials = new Credentials();
        //if (!$credentials->hasAdminCredentials($creds))
        //    return false;

        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();

        //Actual query
        $sqlQuery = "   SELECT recherche_id as id, question_rech as question 
                        FROM `recherches` 
                        WHERE user_id = :userId";

        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue('userId', $userId);
        $statement->execute();

        $recherches = $statement->fetchAll();
        $db->disconnect();

        return $recherches;
    }
}
