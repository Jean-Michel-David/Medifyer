<?php
require_once(dirname(__FILE__) . '/../credentials.php');
class QuestionManager{
/**
  @Description insert a question into the db
   If the id of the question is already set we update the db.
  **/
    public function saveQuestion(Question $question,$con,$authorization){
        $paramUpdate = array();
        $paramsInsert = array();
        $credsObj = new Credentials();

        if ($question->getId() > 0) {   //si la question est déjà présente dans la db
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
            'user_id' => 1/*$credsObj->extractUserId($authorization)*/,

            'termesFrancaisPopulation' => json_encode($question->getPatient_Language_Naturel(),JSON_UNESCAPED_UNICODE),
            'termesFrancaisResultat' => json_encode($question->getRésultats_Language_Naturel(),JSON_UNESCAPED_UNICODE),
            'termesFrancaisTraitement' => json_encode($question->getIntervention_Language_Naturel(),JSON_UNESCAPED_UNICODE),
            'termesMeshPopulation' => json_encode($question->getPatient_Terme_Mesh(),JSON_UNESCAPED_UNICODE),
            'termesMeshResultat' => json_encode($question->getRésultats_Terme_Mesh(),JSON_UNESCAPED_UNICODE),
            'termesMeshTraitement' => json_encode($question->getIntervention_Terme_Mesh(),JSON_UNESCAPED_UNICODE),
            'synonymesPopulation' => json_encode($question->getPatient_Synonyme(),JSON_UNESCAPED_UNICODE),
            'synonymesResultat' => json_encode($question->getRésultats_Synonyme(),JSON_UNESCAPED_UNICODE),
            'synonymesTraitement' => json_encode($question->getIntervention_Synonyme(),JSON_UNESCAPED_UNICODE),

            'relationsPopulation' => json_encode($question->getEquations_PatientPopPath()) ,
            'relationsTraitement' => json_encode($question->getEquations_Intervention(),JSON_UNESCAPED_UNICODE),
            'relationsResultat' => json_encode($question->getEquations_Resultats(),JSON_UNESCAPED_UNICODE),
            );

            $params = array_merge($paramUpdate,$paramsInsert);
            $insert->execute($params); //return true si le query a bien été exécuté
            $insert->closeCursor();
            $this->insertCoWorkers($con,$question,$authorization);
            
            echo json_encode($question);
            
        }catch(PDOException $e){
            die($e);
        }finally{
            $insert->closeCursor();
        }
    }


/**
  @Description set the new question's id. And set the coworkers for the question
  **/
    function insertCoWorkers($con, $question,$authorization) {
        if($question->getId() < 0){
            //si c'était une nouvelle question alors on récupère son id et on le met dans l'obj question
            $sql = ("SELECT recherche_id FROM recherches WHERE user_id = :user_id ORDER BY recherche_id DESC LIMIT 1");
            $insert = $con->prepare($sql);
        $params = array ('user_id' => 1/*$credsObj->extractUserId($authorization)*/); 
            $insert->execute($params);
            $result = $insert->fetch(PDO::FETCH_ASSOC);
            $question ->setId($result["recherche_id"]);
            
            //on vient ensuite insérer les CoWorkers en db
            $id_array = $question->getCoWorkers();
            foreach ($id_array as $id) {
                $sql = ("INSERT INTO aaccesa(recherche_id,user_id) VALUES(:recherche_id,:CoWorkers)");
                $params = array ('recherche_id' => $question->getId(),'CoWorkers' => $id);
                $insert = $con->prepare($sql);
                $insert->execute($params);
            }
        } else {
            //si la question existe déjà on regarde la différence entre les nouveaux et anciens users et on les rajoute
            $sql = "SELECT user_id FROM aaccesa WHERE recherche_id = :recherche_id";
            $params = array ('recherche_id' => $question->getId());
            $insert = $con->prepare($sql);
            $insert->execute($params);
            
            $result = $insert->fetchAll(PDO::FETCH_COLUMN);
            
            $toInsert = array_diff($question->getCoWorkers(), $result);
            foreach($toInsert as $id) {
                $sql = ("INSERT INTO aaccesa(recherche_id,user_id) VALUES(:recherche_id,:CoWorkers)");
                $params = array ('recherche_id' => $question->getId(),'CoWorkers' => $id);
                $insert = $con->prepare($sql);
                $insert->execute($params);
            }
        }
    }
/**
  @Description return the questions of the connected user
  **/
  function getUserSearches($con, $authorization) {
    $credsObj = new Credentials();
    try {
        $sqlQuery = "SELECT recherche_id as id, question_rech as question 
                FROM `recherches` 
                WHERE user_id = :userId";

        $statement = $con->prepare($sqlQuery);

        $statement->bindValue('userId', 1 /*$credsObj->extractUserId($authorization)*/);
        $statement->execute();

        $recherches = $statement->fetchAll(PDO::FETCH_ASSOC);

        // décoder les données JSON
        foreach ($recherches as &$recherche) {
            $recherche['question'] = json_decode($recherche['question']);
        }

        return $recherches;
    } catch(PDOException $e){
        die($e);
    } finally{
        $statement->closeCursor();
    }
}
    
}