<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');

require('../database/dbConnection.php');
require('Question.class.php');
require('QuestionManager.php');
$dbConnection = new DBConnection();
$con = $dbConnection->connect();
$questionManager = new QuestionManager();

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $json_obj = json_decode(file_get_contents('php://input'), true);
  $question = new Question();
  
  $question->setId($json_obj["id"]);
  $question->setAcces($json_obj["acces"]);
  $question->setCommentaires($json_obj["commentaires"]);
  $question->setQuestion($json_obj["Question"]);
  $question->setPatient_Pop_Path($json_obj["Patient_Pop_Path"]);
  $question->setIntervention_Traitement($json_obj["Intervention_Traitement"]);
  $question->setRésultats($json_obj["Résultats"]);
  $question->setPatient_Language_Naturel($json_obj["Patient_Language_Naturel"]);
  $question->setPatient_Terme_Mesh($json_obj["Patient_Terme_Mesh"]);
  $question->setPatient_Synonyme($json_obj["Patient_Synonyme"]);
  $question->setIntervention_Language_Naturel($json_obj["Intervention_Language_Naturel"]);
  $question->setIntervention_Terme_Mesh($json_obj["Intervention_Terme_Mesh"]);
  $question->setIntervention_Synonyme($json_obj["Intervention_Synonyme"]);
  $question->setRésultats_Language_Naturel($json_obj["Résultats_Language_Naturel"]);
  $question->setRésultats_Terme_Mesh($json_obj["Résultats_Terme_Mesh"]);
  $question->setRésultats_Synonyme($json_obj["Résultats_Synonyme"]);
  $question->setEquations_PatientPopPath($json_obj["Equations_PatientPopPath"]);
  $question->setEquations_Intervention($json_obj["Equations_Intervention"]);
  $question->setEquations_Resultats($json_obj["Equations_Resultats"]);

  $questionManager->saveQuestion($question,$con);
}
?>