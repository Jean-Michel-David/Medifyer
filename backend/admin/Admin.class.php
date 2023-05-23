<?php
require_once(dirname(__FILE__) . '/../credentials.php');

class AdminManager {
    /**
     * this function returns the users matching the search string
     * @param $creds the string containing the credentials
     * @param string $parameters the search string
     * @param int $userCount the number of users to skip
     * @param int $usersByPage optionnal parameter : number of users to display
     * @return array|false array if there is no problem, false if something went wrong
     */
    public static function getUserList(string $parameters, int $userCount, int $usersByPage = 10) {
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
        $statement->bindValue('startUser', $userCount, PDO::PARAM_INT);
        $statement->bindValue('numberOfUsers', $usersByPage, PDO::PARAM_INT);

        $statement->execute();

        $users = $statement->fetchAll();
        $db->disconnect();

        return $users;
    }

    /**
     * This function will fetch the searches of the desired user
     * @param $creds the string containing the credentials
     * @param string $userId the id of the user from which to select the researches
     * @return array|false array if there is no problem, false if something went wrong
     */
    public static function getUserSearches(string $userId) {
        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();

        //Actual query
        $sqlQuery = "   SELECT recherche_id as id, question_rech as question, lastUpdate as laDate
                        FROM `recherches` 
                        WHERE user_id = :userId";

        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue('userId', $userId);
        $statement->execute();

        $recherches = $statement->fetchAll();
        $db->disconnect();

        foreach($recherches as &$rech) {
            $rech['question'] = json_decode($rech['question']);
        }

        return $recherches;
    }

    /**
     * This function will fetch the searches of the desired user
     * @param $creds the string containing the credentials
     * @param string $userId the id of the user from which to select the researches
     * @return array|false array if there is no problem, false if something went wrong
     */
    public static function getSharedUserSearches(string $userId) {
        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();
        $conn = $db->connect();

        //Actual query
        $sqlQuery = "SELECT recherche_id as id
        FROM aaccesa 
        WHERE user_id = :userId";

        $statement = $conn->prepare($sqlQuery);
        $statement->bindValue('userId', $userId);
        $statement->execute();
        $sharedSearches = $statement->fetchAll(PDO::FETCH_ASSOC);

        $searches = [];

        foreach($sharedSearches as $search){
            $sqlQuery = "SELECT recherche_id as id, question_rech as question, lastUpdate as laDate 
            FROM recherches 
            WHERE recherche_id = :recherche_id";

            $statement = $conn->prepare($sqlQuery);
            $statement->bindValue('recherche_id', $search['id']);
            $statement->execute();
            array_push($searches,...$statement->fetchAll(PDO::FETCH_ASSOC));
        }
        foreach ($searches as &$search)
            $search['question'] = json_decode($search['question']);

        return $searches;
    }

    /**
     * This function will update an info
     * @param $creds The credentials of the admin
     * @param string $label The label of the info to change
     * @param string $text The new text for the info
     * @return int The number of affected rows (1 if it worked, 0 if it didn't) -Can be treated as boolean-
     */
    public static function setInfobulles(string $label, string $text) : int {
        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();

        //Actual query
        $sqlQuery = "UPDATE `infos` 
                     SET `texte_info` = :newText 
                     WHERE libelle_info = :libelle";

        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue('newText',$text);
        $statement->bindValue('libelle', $label);

        $statement->execute();

        $count = $statement->rowCount();
        $db->disconnect();
        return $count;
    }

    /**
     * @param int $id the ID of the admin
     * @param int $user the ID of the user
     * @param bool $isAdmin true or false
     * @return string the error message (empty string if no error)
     */
    public static function setAdminStatus(int $id, int $user, bool $isAdmin) : string{
        //Check if admin can modify admin status of the second admin
        if ($id == $user)
            return "Vous ne pouvez pas modifier votre propre status";

        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();

        //Check for the count of admins in case we remove one :
        if (!$isAdmin) {
            $sqlQuery = "SELECT COUNT(*) as adminsCount FROM users WHERE admin_user = 1";

            $statement = $db->connect()->prepare($sqlQuery);
            $statement->execute();

            $count = $statement->fetch()['adminsCount'];
            $db->disconnect();
            if ($count <= 2)
                return "Vous ne pouvez pas rétrograder cet utilisateur, sinon le nombre d'administrateurs sera insuffisant";
        }

        //Update in the DB if all the requirements are met
        $sqlQuery = "UPDATE users SET admin_user = :status WHERE user_id = :user";
        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue(":status", $isAdmin, PDO::PARAM_INT);
        $statement->bindValue(":user", $user, PDO::PARAM_INT);

        $statement->execute();

        $result = $statement->rowCount();
        if ($result != 1)
            return "Something went wrong...";
        return "";
    }

    /**
     * @param string $comment the comment to insert in the question
     * @param int $questionId the ID of the question to comment
     * @return bool true if it was a success
     */
    public static function commentQuestion(string $comment, int $questionId) : bool {
        //include class dbConnection (PDO connection to the database)
        require_once(dirname(__FILE__) . '/../database/dbConnection.php');
        $db = new DBConnection();

        $sqlQuery = "   UPDATE `recherches` 
                        SET commentaire_rech = :comment 
                        WHERE recherche_id = :questId;";

        $statement = $db->connect()->prepare($sqlQuery);

        $statement->bindValue(':comment', json_encode($comment));
        $statement->bindValue(':questId', $questionId, PDO::PARAM_INT);

        $statement->execute();

        return ($statement->rowCount() <= 1);
    }

}
