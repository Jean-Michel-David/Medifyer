import { Component, Input, Output } from '@angular/core';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { Operateurs } from '../operateurs';
import { Question } from '../question';

@Component({
  selector: 'app-sauvegarder',
  templateUrl: './sauvegarder.component.html',
  styleUrls: ['./sauvegarder.component.css']
})
export class SauvegarderComponent {
  @Input()
  question! : Question;
  @Output()
  newQuestion! : Question;

  constructor(private api: UserRechercheService) {}

  sauvegarder(question : Question){
    const sub = this.api.sauvegarder(question).subscribe((reponse) => {
      this.newQuestion = reponse;
      console.log(this.newQuestion); //if reponse != null then store data into a var and show a pop up success
      sub.unsubscribe();
    });
  }
  mockOperateurs : Operateurs = {
    inclureTous : ["hyperkinesis"],
    auMoins1 : [["Vertigo","Dizziness"],["Vertigo","Dizziness"]],
    exclure : ["hypertension"]
  }
  mockQuestion : Question = {
    id :-1,
    acces:1,
    commentaires:"attention faute d'ortographe",
    coWorker : [],
    Question : "test modif",
    Patient_Pop_Path : "Problèmes d'équilibre",
    Intervention_Traitement : "Traitement par réalité virtuelle",
    Résultats : "Amélioration de la qualité de vie",

    Patient_Language_Naturel : ["Problèmes d'équilibre","Vertiges"],
    Patient_Terme_Mesh : ["vestibular diseases","Vertigo","dizziness"],
    Patient_Synonyme : ["Fall"],

    Intervention_Language_Naturel : ["Réalité virtuelle"],
    Intervention_Terme_Mesh : ["Virtual reality","virtual reality exposure therapy"],
    Intervention_Synonyme : ["video Game"],

    Résultats_Language_Naturel : ["TSOBATSO TEST DE modif"],
    Résultats_Terme_Mesh : ["quality of live"],
    Résultats_Synonyme : ["better mobility"],

    Equations_PatientPopPath :this.mockOperateurs,
    Equations_Intervention : this.mockOperateurs,
    Equations_Resultats : this.mockOperateurs
  }
}
