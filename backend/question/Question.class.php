<?php

class Question implements JsonSerializable
{
  private $id;
  private $acces;
  private $commentaires;
  private $coWorkers;
  private $question;
  private $Patient_Pop_Path;
  private $Intervention_Traitement;
  private $Résultats;
  private $Patient_Language_Naturel;
  private $Patient_Terme_Mesh;
  private $Patient_Synonyme;
  private $Intervention_Language_Naturel;
  private $Intervention_Terme_Mesh;
  private $Intervention_Synonyme;
  private $Résultats_Language_Naturel;
  private $Résultats_Terme_Mesh;
  private $Résultats_Synonyme;
  private $Equations_PatientPopPath;
  private $Equations_Intervention;
  private $Equations_Resultats;

  


  /**
   * Get the value of id
   */ 
  public function getId()
  {
    return $this->id;
  }

  /**
   * Set the value of id
   *
   * @return  self
   */ 
  public function setId($id)
  {
    $this->id = $id;

    return $this;
  }

  /**
   * Get the value of question
   */ 
  public function getQuestion()
  {
    return $this->question;
  }

  /**
   * Set the value of question
   *
   * @return  self
   */ 
  public function setQuestion($question)
  {
    $this->question = $question;

    return $this;
  }

 

  /**
   * Get the value of Patient_Pop_Path
   */ 
  public function getPatient_Pop_Path()
  {
    return $this->Patient_Pop_Path;
  }

  /**
   * Set the value of Patient_Pop_Path
   *
   * @return  self
   */ 
  public function setPatient_Pop_Path($Patient_Pop_Path)
  {
    $this->Patient_Pop_Path = $Patient_Pop_Path;

    return $this;
  }

  /**
   * Get the value of Intervention_Traitement
   */ 
  public function getIntervention_Traitement()
  {
    return $this->Intervention_Traitement;
  }

  /**
   * Set the value of Intervention_Traitement
   *
   * @return  self
   */ 
  public function setIntervention_Traitement($Intervention_Traitement)
  {
    $this->Intervention_Traitement = $Intervention_Traitement;

    return $this;
  }

  /**
   * Get the value of Résultats
   */ 
  public function getRésultats()
  {
    return $this->Résultats;
  }

  /**
   * Set the value of Résultats
   *
   * @return  self
   */ 
  public function setRésultats($Résultats)
  {
    $this->Résultats = $Résultats;

    return $this;
  }

  /**
   * Get the value of Patient_Language_Naturel
   */ 
  public function getPatient_Language_Naturel()
  {
    return $this->Patient_Language_Naturel;
  }

  /**
   * Set the value of Patient_Language_Naturel
   *
   * @return  self
   */ 
  public function setPatient_Language_Naturel($Patient_Language_Naturel)
  {
    $this->Patient_Language_Naturel = $Patient_Language_Naturel;

    return $this;
  }

  /**
   * Get the value of Patient_Terme_Mesh
   */ 
  public function getPatient_Terme_Mesh()
  {
    return $this->Patient_Terme_Mesh;
  }

  /**
   * Set the value of Patient_Terme_Mesh
   *
   * @return  self
   */ 
  public function setPatient_Terme_Mesh($Patient_Terme_Mesh)
  {
    $this->Patient_Terme_Mesh = $Patient_Terme_Mesh;

    return $this;
  }

  /**
   * Get the value of Patient_Synonyme
   */ 
  public function getPatient_Synonyme()
  {
    return $this->Patient_Synonyme;
  }

  /**
   * Set the value of Patient_Synonyme
   *
   * @return  self
   */ 
  public function setPatient_Synonyme($Patient_Synonyme)
  {
    $this->Patient_Synonyme = $Patient_Synonyme;

    return $this;
  }

  /**
   * Get the value of Intervention_Language_Naturel
   */ 
  public function getIntervention_Language_Naturel()
  {
    return $this->Intervention_Language_Naturel;
  }

  /**
   * Set the value of Intervention_Language_Naturel
   *
   * @return  self
   */ 
  public function setIntervention_Language_Naturel($Intervention_Language_Naturel)
  {
    $this->Intervention_Language_Naturel = $Intervention_Language_Naturel;

    return $this;
  }

  /**
   * Get the value of Intervention_Terme_Mesh
   */ 
  public function getIntervention_Terme_Mesh()
  {
    return $this->Intervention_Terme_Mesh;
  }

  /**
   * Set the value of Intervention_Terme_Mesh
   *
   * @return  self
   */ 
  public function setIntervention_Terme_Mesh($Intervention_Terme_Mesh)
  {
    $this->Intervention_Terme_Mesh = $Intervention_Terme_Mesh;

    return $this;
  }

  /**
   * Get the value of Intervention_Synonyme
   */ 
  public function getIntervention_Synonyme()
  {
    return $this->Intervention_Synonyme;
  }

  /**
   * Set the value of Intervention_Synonyme
   *
   * @return  self
   */ 
  public function setIntervention_Synonyme($Intervention_Synonyme)
  {
    $this->Intervention_Synonyme = $Intervention_Synonyme;

    return $this;
  }

  /**
   * Get the value of Résultats_Language_Naturel
   */ 
  public function getRésultats_Language_Naturel()
  {
    return $this->Résultats_Language_Naturel;
  }

  /**
   * Set the value of Résultats_Language_Naturel
   *
   * @return  self
   */ 
  public function setRésultats_Language_Naturel($Résultats_Language_Naturel)
  {
    $this->Résultats_Language_Naturel = $Résultats_Language_Naturel;

    return $this;
  }

  /**
   * Get the value of Résultats_Terme_Mesh
   */ 
  public function getRésultats_Terme_Mesh()
  {
    return $this->Résultats_Terme_Mesh;
  }

  /**
   * Set the value of Résultats_Terme_Mesh
   *
   * @return  self
   */ 
  public function setRésultats_Terme_Mesh($Résultats_Terme_Mesh)
  {
    $this->Résultats_Terme_Mesh = $Résultats_Terme_Mesh;

    return $this;
  }

  /**
   * Get the value of Résultats_Synonyme
   */ 
  public function getRésultats_Synonyme()
  {
    return $this->Résultats_Synonyme;
  }

  /**
   * Set the value of Résultats_Synonyme
   *
   * @return  self
   */ 
  public function setRésultats_Synonyme($Résultats_Synonyme)
  {
    $this->Résultats_Synonyme = $Résultats_Synonyme;

    return $this;
  }

  /**
   * Get the value of Equations_PatientPopPath
   */ 
  public function getEquations_PatientPopPath()
  {
    return $this->Equations_PatientPopPath;
  }

  /**
   * Set the value of Equations_PatientPopPath
   *
   * @return  self
   */ 
  public function setEquations_PatientPopPath($Equations_PatientPopPath)
  {
    $this->Equations_PatientPopPath = $Equations_PatientPopPath;

    return $this;
  }

  /**
   * Get the value of Equations_Intervention
   */ 
  public function getEquations_Intervention()
  {
    return $this->Equations_Intervention;
  }

  /**
   * Set the value of Equations_Intervention
   *
   * @return  self
   */ 
  public function setEquations_Intervention($Equations_Intervention)
  {
    $this->Equations_Intervention = $Equations_Intervention;

    return $this;
  }

  /**
   * Get the value of Equations_Resultats
   */ 
  public function getEquations_Resultats()
  {
    return $this->Equations_Resultats;
  }

  /**
   * Set the value of Equations_Resultats
   *
   * @return  self
   */ 
  public function setEquations_Resultats($Equations_Resultats)
  {
    $this->Equations_Resultats = $Equations_Resultats;

    return $this;
  }

  /**
   * Get the value of acces
   */ 
  public function getAcces()
  {
    return $this->acces;
  }

  /**
   * Set the value of acces
   *
   * @return  self
   */ 
  public function setAcces($acces)
  {
    $this->acces = $acces;

    return $this;
  }

  /**
   * Get the value of commentaires
   */ 
  public function getCommentaires()
  {
    return $this->commentaires;
  }

  /**
   * Set the value of commentaires
   *
   * @return  self
   */ 
  public function setCommentaires($commentaires)
  {
    $this->commentaires = $commentaires;

    return $this;
  }

  /**
   * Get the value of coWorkers
   */ 
  public function getCoWorkers()
  {
    return $this->coWorkers;
  }

  /**
   * Set the value of coWorkers
   *
   * @return  self
   */ 
  public function setCoWorkers($coWorkers)
  {
    $this->coWorkers = $coWorkers;

    return $this;
  }

  public function jsonSerialize(): mixed
  {
    return array(
      'Question' => $this->getQuestion(),
      'Patient_Pop_Path' => $this->getPatient_Pop_Path(),
      'Intervention_Traitement' => $this->getIntervention_Traitement(),
      'Résultats' => $this->getRésultats(),
      'acces' => $this->getAcces(),
      'commentaires' => $this->getCommentaires(),
      'id' => $this->getId(),
      'coWorker'=>$this->getCoWorkers(),

      'Patient_Language_Naturel' => $this->getPatient_Language_Naturel(),
      'Résultats_Language_Naturel' => $this->getRésultats_Language_Naturel(),
      'Intervention_Language_Naturel' => $this->getIntervention_Language_Naturel(),
      'Patient_Terme_Mesh' => $this->getPatient_Terme_Mesh(),
      'Résultats_Terme_Mesh' => $this->getRésultats_Terme_Mesh(),
      'Intervention_Terme_Mesh' => $this->getIntervention_Terme_Mesh(),
      'Patient_Synonyme' => $this->getPatient_Synonyme(),
      'Résultats_Synonyme' => $this->getRésultats_Synonyme(),
      'Intervention_Synonyme' => $this->getIntervention_Synonyme(),

      'Equations_PatientPopPath' => $this->getEquations_PatientPopPath(),
      'Equations_Intervention' => $this->getEquations_Intervention(),
      'Equations_Resultats' => $this->getEquations_Resultats()
    );
  }

  
}