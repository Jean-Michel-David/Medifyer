export interface Question {
  Question : string;
  Patient_Pop_Path : string;
  Intervention_Traitement : string;
  Résultats : string;

  Patient_Language_Naturel : [];
  Patient_Terme_Mesh : [];
  Patient_Synonyme : [];

  Intervention_Language_Naturel : [];
  Intervention_Terme_Mesh : [];
  Intervention_Synonyme : [];

  Résultats_Language_Naturel : [];
  Résultats_Terme_Mesh : [];
  Résultats_Synonyme : [];

  Equations_PatientPopPath : [];
  Equations_Intervention : [];
  Equations_Resultats : [];
}
