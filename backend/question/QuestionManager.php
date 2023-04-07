<?php
class QuestionManager{
/**
  @Description insert a question into the db and echo the new question's id.
   If the id of the question is already set we update the db.
  **/
    public function saveQuestion(Question $question,$con,$authorization){
        $paramUpdate = array();
        $paramsInsert = array();
        //$credsObj = new Credentials();

        if ($question->getId() > 0) {
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
            
          } else {
              $sql="INSERT INTO recherches (question_rech,population_rech,traitement_rech,resultat_rech,public_rech,commentaire_rech,user_id) 
              VALUES (:question_rech,:population_rech,:traitement_rech,:resultat_rech,:public_rech,:commentaire_rech,:user_id);
              
              SET @last_id_in_table = LAST_INSERT_ID();

              INSERT INTO `termes`(`termesFrancaisPopulation`, `termesFrancaisResultat`, `termesFrancaisTraitement`, `termesMeshPopulation`, `termesMeshResultat`,
               `termesMeshTraitement`, `synonymesPopulation`, `synonymesResultat`, `synonymesTraitement`, `recherche_id`) 
               VALUES (:termesFrancaisPopulation, :termesFrancaisResultat, :termesFrancaisTraitement, :termesMeshPopulation, :termesMeshResultat,
               :termesMeshTraitement, :synonymesPopulation, :synonymesResultat, :synonymesTraitement, @last_id_in_table);
               
               SET @last_id_in_table = LAST_INSERT_ID();
               
               INSERT INTO equation(`relationsPopulation`, `relationsTraitement`, `relationsResultat`, `terme_id`)
                VALUES (:relationsPopulation,:relationsTraitement,:relationsResultat,@last_id_in_table);";       
          }
        try{
            $insert = $con->prepare($sql);
            
            $paramsInsert = array (
            'question_rech' => json_encode($question->getQuestion()) ,
            'population_rech' => json_encode($question->getPatient_Pop_Path()),
            'traitement_rech' => json_encode($question->getIntervention_Traitement()),
            'resultat_rech' => json_encode($question->getRésultats()),
            'public_rech' => json_encode($question->getAcces()),
            'commentaire_rech' => json_encode($question->getCommentaires()),
            'user_id' => 1,//json_encode($credsObj->extractUserId($authorization))

            'termesFrancaisPopulation' => json_encode($question->getPatient_Language_Naturel()),
            'termesFrancaisResultat' => json_encode($question->getRésultats_Language_Naturel()),
            'termesFrancaisTraitement' => json_encode($question->getIntervention_Language_Naturel()),
            'termesMeshPopulation' => json_encode($question->getPatient_Terme_Mesh()),
            'termesMeshResultat' => json_encode($question->getRésultats_Terme_Mesh()),
            'termesMeshTraitement' => json_encode($question->getIntervention_Terme_Mesh()),
            'synonymesPopulation' => json_encode($question->getPatient_Synonyme()),
            'synonymesResultat' => json_encode($question->getRésultats_Synonyme()),
            'synonymesTraitement' => json_encode($question->getIntervention_Synonyme()),

            'relationsPopulation' => json_encode($question->getEquations_PatientPopPath()) ,
            'relationsTraitement' => json_encode($question->getEquations_Intervention()),
            'relationsResultat' => json_encode($question->getEquations_Resultats()),
            );

            $params = array_merge($paramUpdate,$paramsInsert);
            $query = $insert->execute($params); //return true si le query a bien été exécuté
            
            if($query == true && ($question->getId() < 0)){     
                $sql = ("SELECT recherche_id FROM recherches WHERE user_id = :user_id ORDER BY recherche_id DESC LIMIT 1");
                $insert = $con->prepare($sql);
                $params = array ('user_id' => 1); //json_encode($credsObj->extractUserId($authorization))
                $insert->execute($params);
                $result = $insert->fetch(PDO::FETCH_ASSOC);
                $question ->setId($result["recherche_id"]);
            }
            $insert->closeCursor();
            echo json_encode($question);
            
        }catch(PDOException $e){
            die($e);
        }finally{
            $insert->closeCursor();
        }
    }
}