export interface Question {
  Question : string;
  Patient_Pop_Path : string;
  Intervention_Traitement : string;
  Résultats : string;

  Patient_Language_Naturel : string[];
  Patient_Terme_Mesh : string[];
  Patient_Synonyme : string[];

  Intervention_Language_Naturel : string[];
  Intervention_Terme_Mesh : string[];
  Intervention_Synonyme : string[];

  Résultats_Language_Naturel : string[];
  Résultats_Terme_Mesh : string[];
  Résultats_Synonyme : string[];

  Equations_PatientPopPath : string[][];
  Equations_Intervention : string[][];
  Equations_Resultats : string[][];
}
