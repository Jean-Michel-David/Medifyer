<?php
require_once(dirname(__FILE__) . '/../credentials.php');
class QuestionManager{
/**
  @Description insert a question into the db
  If the id of the question is already set we update the db.
  Parameters : the question to save, the connection to the db, the authorization header
  **/
  public function saveQuestion(Question $question,PDO $con,string $authorization){
        $paramUpdate = array();
        $credsObj = new Credentials();

        if ($question->getId() > 0) {   //si la question est déjà présente dans la db
             //s'il n'est pas coworkers et qu'il n'est pas proprio
             if (!in_array($this->getEmailFromId($credsObj->extractUserId($authorization),$con), $question->getCoWorkers()) && $this->isQuestionOwner($question->getId(), $con, $authorization) == false)
                return false;
            
            $sql="UPDATE recherches SET `question_rech`=:question_rech,`population_rech`=:population_rech,`traitement_rech`=:traitement_rech,`resultat_rech`=:resultat_rech,
            `public_rech`=:public_rech,`commentaire_rech`=:commentaire_rech 
            WHERE recherche_id=:recherche_id;

            UPDATE termes SET `termesFrancaisPopulation`=:termesFrancaisPopulation,`termesFrancaisResultat`=:termesFrancaisResultat,
            `termesFrancaisTraitement`=:termesFrancaisResultat,`termesMeshPopulation`=:termesMeshPopulation,
            `termesMeshResultat`=:termesMeshResultat,`termesMeshTraitement`=:termesMeshTraitement,`synonymesPopulation`=:synonymesPopulation,
            `synonymesResultat`=:synonymesResultat,`synonymesTraitement`=:synonymesTraitement 
            WHERE recherche_id=:recherche_id;

            SET @terme_id = (SELECT terme_id FROM termes WHERE recherche_id = :recherche_id);

            UPDATE equation SET `relationsPopulation`=:relationsPopulation,`relationsTraitement`=:relationsTraitement,`relationsResultat`=:relationsResultat
            WHERE terme_id = @terme_id;";

            $paramUpdate = array('recherche_id' => $question->getId(),);
            
          } else { //si c'est une nouvelle question
              $sql="INSERT INTO recherches (question_rech,population_rech,traitement_rech,resultat_rech,public_rech,commentaire_rech,user_id) 
              VALUES (:question_rech,:population_rech,:traitement_rech,:resultat_rech,:public_rech,:commentaire_rech,:user_id);
              
              SET @last_id_in_table = LAST_INSERT_ID();

              INSERT INTO `termes`(`termesFrancaisPopulation`, `termesFrancaisResultat`, `termesFrancaisTraitement`, `termesMeshPopulation`, `termesMeshResultat`,
               `termesMeshTraitement`, `synonymesPopulation`, `synonymesResultat`, `synonymesTraitement`, `recherche_id`) 
               VALUES (:termesFrancaisPopulation, :termesFrancaisResultat, :termesFrancaisTraitement, :termesMeshPopulation, :termesMeshResultat,
               :termesMeshTraitement, :synonymesPopulation, :synonymesResultat, :synonymesTraitement, @last_id_in_table);
               
               SET @last_id_in_table = LAST_INSERT_ID();
               
               INSERT INTO equation(relationsPopulation, relationsTraitement, relationsResultat, terme_id)
                VALUES (:relationsPopulation,:relationsTraitement,:relationsResultat,@last_id_in_table);";
          }
        try{
            $insert = $con->prepare($sql);
            
            $paramsInsert = array (
            'question_rech' => json_encode($question->getQuestion(),JSON_UNESCAPED_UNICODE),
            'population_rech' => json_encode($question->getPatient_Pop_Path(),JSON_UNESCAPED_UNICODE),
            'traitement_rech' => json_encode($question->getIntervention_Traitement(),JSON_UNESCAPED_UNICODE),
            'resultat_rech' => json_encode($question->getRésultats(),JSON_UNESCAPED_UNICODE),
            'public_rech' => json_encode($question->getAcces(),JSON_UNESCAPED_UNICODE),
            'commentaire_rech' => json_encode($question->getCommentaires(),JSON_UNESCAPED_UNICODE),
            'user_id' => $credsObj->extractUserId($authorization),

            'termesFrancaisPopulation' => json_encode($question->getPatient_Language_Naturel(),JSON_UNESCAPED_UNICODE),
            'termesFrancaisResultat' => json_encode($question->getRésultats_Language_Naturel(),JSON_UNESCAPED_UNICODE),
            'termesFrancaisTraitement' => json_encode($question->getIntervention_Language_Naturel(),JSON_UNESCAPED_UNICODE),
            'termesMeshPopulation' => json_encode($question->getPatient_Terme_Mesh(),JSON_UNESCAPED_UNICODE),
            'termesMeshResultat' => json_encode($question->getRésultats_Terme_Mesh(),JSON_UNESCAPED_UNICODE),
            'termesMeshTraitement' => json_encode($question->getIntervention_Terme_Mesh(),JSON_UNESCAPED_UNICODE),
            'synonymesPopulation' => json_encode($question->getPatient_Synonyme(),JSON_UNESCAPED_UNICODE),
            'synonymesResultat' => json_encode($question->getRésultats_Synonyme(),JSON_UNESCAPED_UNICODE),
            'synonymesTraitement' => json_encode($question->getIntervention_Synonyme(),JSON_UNESCAPED_UNICODE),

            'relationsPopulation' => json_encode($question->getEquations_PatientPopPath(),JSON_UNESCAPED_UNICODE) ,
            'relationsTraitement' => json_encode($question->getEquations_Intervention(),JSON_UNESCAPED_UNICODE),
            'relationsResultat' => json_encode($question->getEquations_Resultats(),JSON_UNESCAPED_UNICODE),
            );

            $params = array_merge($paramUpdate,$paramsInsert);
            $insert->execute($params); //return true si le query a bien été exécuté

            $lastInsert = $con->lastInsertId();
            if ($lastInsert != 0)
                $question->setId($lastInsert);

            $insert->closeCursor();
            $this->insertCoWorkers($con,$question,$authorization,$credsObj);
            
            echo json_encode($question);
            return true;
        }catch(PDOException $e){
            die($e);
        }finally{
            $insert->closeCursor();
        }
    }


  /**
  @Description set the new question's id. And set the coworkers for the question
  **/
  function insertCoWorkers(PDO $con, Question $question, string $authorization, Credentials $credsObj) {
    $sql = "SELECT user_id FROM aaccesa WHERE recherche_id = :recherche_id";
    $params = array ('recherche_id' => $question->getId());
    $insert = $con->prepare($sql);
    $insert->execute($params);

    $result = $insert->fetchAll(PDO::FETCH_COLUMN);

    $idToAdd = [];
    foreach ($question->getCoWorkers() as $email) {
        if ($this->userExist($email, $con))
            $idToAdd[] = $this->getIdFromEmail($email, $con);

        else {
            $array =  array_filter($question->getCoWorkers(), static function ($element) use ($email) {return $element != $email;});
            $question->setCoWorkers($array);
        }
    }

    $toInsert = array_diff($idToAdd, $result);
    $toDelete = array_diff($result, $idToAdd);

    foreach($toInsert as $id) {
        $sql = "INSERT INTO aaccesa(recherche_id,user_id) VALUES(:recherche_id,:CoWorkers)";
        $params = array ('recherche_id' => $question->getId(),'CoWorkers' => $id);
        $insert = $con->prepare($sql);
        $insert->execute($params);
    }

    foreach ($toDelete as $item) {
        $sql = "DELETE FROM aaccesa WHERE recherche_id = :rechId AND user_id = :userId";
        $params = [
          'rechId' => $question->getId(),
          'userId' => $item
        ];
        $del = $con->prepare($sql);
        $del->execute($params);
    }

}
  /**
  @Description return the questions of the connected user
  **/
  function getUserSearches($con, $authorization) {
    $credsObj = new Credentials();
    $userId = $credsObj->extractUserId($authorization);
    if (!$userId)
        return false;

    try {
    //récupère les recherches du user connecté
        $sqlQuery = "SELECT recherche_id as id, question_rech as question, lastUpdate as laDate 
                FROM `recherches` 
                WHERE user_id = :userId
                ORDER BY lastUpdate DESC";

        $statement = $con->prepare($sqlQuery);

        $statement->bindValue('userId', $userId);
        $statement->execute();

        $recherches = $statement->fetchAll(PDO::FETCH_ASSOC);
    
    // décode les données JSON
        foreach ($recherches as &$recherche) 
            $recherche['question'] = json_decode($recherche['question']);
        
        return $recherches;
    } catch(PDOException $e){
        die($e);
    } finally{
        $statement->closeCursor();
    }
}

/**
  @Description return the questions shared with the connected user for modification
  **/
function getSharedSearches($con, $authorization){
    $credsObj = new Credentials();
    try{
    //récupère les recherches partagées avec le user connecté
        $sqlQuery = "SELECT recherche_id as id
        FROM aaccesa 
        WHERE user_id = :userId";

        $statement = $con->prepare($sqlQuery);
        $statement->bindValue('userId', $credsObj->extractUserId($authorization));
        $statement->execute();
        $recherchesPartagees = $statement->fetchAll(PDO::FETCH_ASSOC);

        $recherches = [];

        foreach($recherchesPartagees as $rech){
            $sqlQuery = "SELECT recherche_id as id, question_rech as question, lastUpdate as laDate
            FROM recherches 
            WHERE recherche_id = :recherche_id";

            $statement = $con->prepare($sqlQuery);
            $statement->bindValue('recherche_id', $rech['id']);
            $statement->execute();
            array_push($recherches,...$statement->fetchAll(PDO::FETCH_ASSOC));
        }
        foreach ($recherches as &$recherche) 
            $recherche['question'] = json_decode($recherche['question']);
            
// Fonction de comparaison basée sur la clé 'laDate'
        function compareByDate($a, $b) {
            $dateA = strtotime($a['laDate']);
            $dateB = strtotime($b['laDate']);
            // b - a pour avoir le résultat en mode DESC
            return $dateB - $dateA;
        }

        // Tri du tableau en utilisant la fonction de comparaison
        usort($recherches, 'compareByDate');

        return $recherches;
    
    } catch(PDOException $e){
        die($e);
    } finally{
        $statement->closeCursor();
    }
}

    /**
     * @param $id the ID of the user
     * @param PDO $con a PDO connection
     * @return string the email of the selected user
     */
function getEmailFromId(int $id, PDO $con) : string {
    if ($id == null)
        return "";
    $sqlQuery = "SELECT email_user FROM users WHERE user_id = :userId";

    $statement = $con->prepare($sqlQuery);
    $statement->bindValue('userId', $id);
    $statement->execute();

    return $statement->fetch(PDO::FETCH_ASSOC)['email_user'];
}

    /**
     * @param string $email the email of the user
     * @param PDO $con a PDO connection
     * @return int The ID of the user
     */
function getIdFromEmail(string $email, PDO $con) : int{
    if (empty($email))
        return 0;

    $sqlQuery = "SELECT user_id FROM users WHERE email_user = :email";
    $statement = $con->prepare($sqlQuery);
    $statement->execute([':email' => $email]);
    if ($statement->rowCount() == 0)
        return 0;
    return $statement->fetch(PDO::FETCH_ASSOC)['user_id'];
}

function userExist(string $email, PDO $conn) : bool {
    $sql = "SELECT user_id FROM users WHERE LOWER(email_user) = LOWER(:email)";

    $statement = $conn->prepare($sql);
    $statement->execute([':email' => $email]);

    return ($statement->rowCount() == 1);
}

/**
@Description Fetch a question based on its id
Parameters : the id of the question to fetch, the connection to the db, the authorization header
return the question
**/
function getQuestion($id ,PDO $con, $authorization){
    $credsObj = new Credentials();
    $question = new Question();
    try {
        $sqlQuery = "SELECT r.recherche_id, r.public_rech,r.commentaire_rech,r.user_id,r.question_rech,r.population_rech,
        r.traitement_rech,r.resultat_rech,t.termesFrancaisPopulation,t.termesFrancaisResultat,t.termesFrancaisTraitement,
        t.termesMeshPopulation,t.termesMeshResultat,t.termesMeshTraitement,t.synonymesPopulation,t.synonymesResultat,
        t.synonymesTraitement,e.relationsPopulation,e.relationsTraitement,e.relationsResultat, acc.user_id as coworker
        FROM recherches r 
        INNER JOIN termes t ON r.recherche_id = t.recherche_id
        INNER JOIN equation e ON e.terme_id = t.terme_id
        LEFT JOIN aaccesa acc ON acc.recherche_id = r.recherche_id
        WHERE r.recherche_id=:recherche_id;";

        $statement = $con->prepare($sqlQuery);

        $statement->bindValue('recherche_id', $id);
        $statement->execute();

        $resultSet = $statement->fetchAll(PDO::FETCH_ASSOC);
        $res = $resultSet[0];

        //Adding the coworkers to the result
        $coworkersSet = [];

        if ($resultSet[0]['coworker'] != null)
            foreach ($resultSet as $result)
                $coworkersSet[] = $this->getEmailFromId($result['coworker'], $con);

        if(json_decode($res["public_rech"]) == 1 
        || json_decode($res["user_id"]) == $credsObj->extractUserId($authorization) 
        || in_array($this->getEmailFromId($credsObj->extractUserId($authorization),$con), $coworkersSet)
        || json_decode($credsObj->hasAdminCredentials($authorization))) {

            $question->setId(json_decode($res["recherche_id"]))
                ->setAcces(json_decode($res["public_rech"]))
                ->setCommentaires(json_decode($res["commentaire_rech"]))
                ->setCoWorkers($coworkersSet)
                ->setQuestion(json_decode($res["question_rech"]))
                ->setPatient_Pop_Path(json_decode($res["population_rech"]))
                ->setIntervention_Traitement(json_decode($res["traitement_rech"]))
                ->setRésultats(json_decode($res["resultat_rech"]))
                ->setPatient_Language_Naturel(json_decode($res["termesFrancaisPopulation"]))
                ->setPatient_Terme_Mesh(json_decode($res["termesMeshPopulation"]))
                ->setPatient_Synonyme(json_decode($res["synonymesPopulation"]))
                ->setIntervention_Language_Naturel(json_decode($res["termesFrancaisTraitement"]))
                ->setIntervention_Terme_Mesh(json_decode($res["termesMeshTraitement"]))
                ->setIntervention_Synonyme(json_decode($res["synonymesTraitement"]))
                ->setRésultats_Language_Naturel(json_decode($res["termesFrancaisResultat"]))
                ->setRésultats_Terme_Mesh(json_decode($res["termesMeshResultat"]))
                ->setRésultats_Synonyme(json_decode($res["synonymesResultat"]))
                ->setEquations_PatientPopPath(json_decode($res["relationsPopulation"]))
                ->setEquations_Intervention(json_decode($res["relationsTraitement"]))
                ->setEquations_Resultats(json_decode($res["relationsResultat"]));


            

            $response = array(
                "canEdit" => false,
                "question" => $question
            );

            $response["canEdit"] = 
            in_array($this->getEmailFromId($credsObj->extractUserId($authorization), $con),$coworkersSet,false) 
            || $credsObj->extractUserId($authorization) == json_decode($res["user_id"]) ;
            return $response;
        } else {
            return null;
        }

    }catch(PDOException $e){
        die($e);
    } finally{
        $statement->closeCursor();
    }
 }

/** 
@Description Delete a question based on its id
Parameters : the id of the question to fetch, the connection to the db, the authorization header
return the question
**/
 function deleteQuestion($id ,$con, $authorization){
    $credsObj = new Credentials();

    try{
        $sqlQuery="DELETE FROM equation
        WHERE terme_id IN (
          SELECT terme_id
          FROM termes
          WHERE recherche_id = :recherche_id
        );
        
        DELETE FROM termes WHERE recherche_id = :recherche_id;
        DELETE from aaccesa where recherche_id = :recherche_id;
        DELETE FROM recherches WHERE recherche_id = :recherche_id;";

        $statement = $con->prepare($sqlQuery);

        $statement->bindValue('recherche_id', $id);
        if($statement->execute())
            return true;
        return false;

    }catch(PDOException $e){
        die($e);
    } finally{
        $statement->closeCursor();
    }

 }

 /**
@Description Fetch the owner of a question based on its id
Parameters : the id of the question to fetch, the connection to the db, the authorization header
return true if the auth header is from the owner of the question, return false otherwise
**/
function isQuestionOwner($id, $con, $authorization){
    $credsObj = new Credentials();
    $question = new Question();
    try {
        $sqlQuery = "SELECT r.user_id,acc.user_id as coworker
        FROM recherches r 
        INNER JOIN termes t ON r.recherche_id = t.recherche_id
        INNER JOIN equation e ON e.terme_id = t.terme_id
        LEFT JOIN aaccesa acc ON acc.recherche_id = r.recherche_id
        WHERE r.recherche_id=:recherche_id;";

        $statement = $con->prepare($sqlQuery);

        $statement->bindValue('recherche_id', $id);
        $statement->execute();

        $resultSet = $statement->fetchAll(PDO::FETCH_ASSOC);
        $res = $resultSet[0];

        if(json_decode($res["user_id"]) == $credsObj->extractUserId($authorization))
           return true;
        return false;
    } catch(PDOException $e){
        die($e);
    } finally{
        $statement->closeCursor();
    }
 }
}