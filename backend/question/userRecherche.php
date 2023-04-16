<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization');

require_once('../database/dbConnection.php');
require_once('Question.class.php');
require_once('QuestionManager.php');

$dbConnection = new DBConnection();
$con = $dbConnection->connect();
$questionManager = new QuestionManager();
$headers = getallheaders();

if($_SERVER['REQUEST_METHOD'] === 'POST'){
  $json_obj = json_decode(file_get_contents('php://input'), true);
  $question = new Question();
  
  $question->setId($json_obj["id"])
    ->setAcces($json_obj["acces"])
    ->setCommentaires($json_obj["commentaires"])
    ->setCoWorkers($json_obj["coWorker"])
    ->setQuestion($json_obj["Question"])
    ->setPatient_Pop_Path($json_obj["Patient_Pop_Path"])
    ->setIntervention_Traitement($json_obj["Intervention_Traitement"])
    ->setRésultats($json_obj["Résultats"])
    ->setPatient_Language_Naturel($json_obj["Patient_Language_Naturel"])
    ->setPatient_Terme_Mesh($json_obj["Patient_Terme_Mesh"])
    ->setPatient_Synonyme($json_obj["Patient_Synonyme"])
    ->setIntervention_Language_Naturel($json_obj["Intervention_Language_Naturel"])
    ->setIntervention_Terme_Mesh($json_obj["Intervention_Terme_Mesh"])
    ->setIntervention_Synonyme($json_obj["Intervention_Synonyme"])
    ->setRésultats_Language_Naturel($json_obj["Résultats_Language_Naturel"])
    ->setRésultats_Terme_Mesh($json_obj["Résultats_Terme_Mesh"])
    ->setRésultats_Synonyme($json_obj["Résultats_Synonyme"])
    ->setEquations_PatientPopPath($json_obj["Equations_PatientPopPath"])
    ->setEquations_Intervention($json_obj["Equations_Intervention"])
    ->setEquations_Resultats($json_obj["Equations_Resultats"]);


$questionManager->saveQuestion($question,$con,$headers/*['Authorization']*/);

} else if($_SERVER['REQUEST_METHOD'] === 'GET'){
  $recherches = $questionManager->getUserSearches($con,$headers/*['Authorization']*/);

    //Error, bad request
    if (gettype($recherches) == "boolean") {
      http_response_code(400);
      exit();
  }

  //HTTP RESPONSE no content
  if (gettype($recherches) == "array" && !$recherches) {
      http_response_code(204);
  }

  //Success
  http_response_code(200);
  echo json_encode($recherches);
  exit();
}
?>