<?php
require_once("../credentials.php");

class Admin {
    public static function getUserList($creds = NULL, string $parameters = "", int $page = 1, int $usersByPage = 10) {
        //Verify credentials
        $credentials = new Credentials();

        if (!$credentials->hasAdminCredentials($creds)) {
            return false;
        }

        //include variable $db (PDO connection to the database)
        require('./database/dbConnection.php');

        //Actual query
        $sqlQuery = "   SELECT user_id, nom_user, prenom_user, email_user, pfp_user, admin_user 
                        FROM `users`
                        WHERE :searchString REGEXP LOWER(nom_user)
                            OR :searchString REGEXP LOWER(prenom_user)
                            OR :searchString REGEXP LOWER(email_user)
                        ORDER BY nom_user, prenom_user
                        LIMIT :startUser, :numberOfUsers;";

        $statement = $db->prepare($sqlQuerry);

        $statement->bindValue('startUser', ($page - 1) * $usersByPage, PDO::PARAM_INT);
        $statement->bindValue('numberOfUsers', $usersByPage, PDO::PARAM_INT);
        $statement->bindValue('searchString', $parameters, PDO::PARAM_STR);

        $statement->execute();

        $users = $statement->fetchAll();

        return $users;
    }
}
