import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';
import { Operateurs } from '../operateurs';
import { Question } from '../question';
@Component({
  selector: 'app-exporter',
  templateUrl: './exporter.component.html',
  styleUrls: ['./exporter.component.css']
})
export class ExporterComponent {

  @Input()
  question!: Question;

/** @description This function take the object from the Question interface then
* parse it and turn it into a more user friendly display(String type). Finaly we save
*that string on the user's computer
*@param Question object from Question's interface
*/
  exportData(question : Question){
    let json = JSON.stringify(question);
    let obj = JSON.parse(json); //creating a json object so we can loop through it
    let str = "";
    let operateurs;
    for (let prop in obj) {//reformat of the obj into a string

      switch(prop){

        case "Question":
          str += "Question de recherche :\n\n\t" + obj[prop] + "\n\n\n";
        break;

        case "Patient_Pop_Path":
          str += "Patient/Population/Pathologie (Qui est concerné? Quelle pathologie? Quelle  population?) :\n\n\t" + obj[prop] + "\n\n\n";
        break;

        case "Intervention_Traitement":
          str += "Intervention/Traitement (Quel est le traitement, l'intervention appliqué(e)) :\n\n\t" + obj[prop] + "\n\n\n";
        break;

        case "Résultats":
          str += "Résultats (Que va-t-on mesurer? Douleur? Périmètre de marche? Qualité de vie?) :\n\n\t" + obj[prop] + "\n\n\n";
        break;

        case "Patient_Language_Naturel":
          str += "Language naturel (FR) utilisé pour le Patient/Population/Pathologie  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Patient_Terme_Mesh":
          str += "Terme Mesh (EN) utilisé pour le Patient/Population/Pathologie  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Patient_Synonyme":
          str += "Synonyme (EN) utilisé pour le Patient/Population/Pathologie  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Intervention_Language_Naturel":
          str += "Language naturel (FR) utilisé pour l'Intervention/Traitement  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Intervention_Terme_Mesh":
          str += "Terme Mesh (EN) utilisé pour l'Intervention/Traitement  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Intervention_Synonyme":
          str += "Synonyme (EN) utilisé pour l'Intervention/Traitement  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Résultats_Language_Naturel":
          str += " Language naturel (FR) utilisé pour les Résultats :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Résultats_Terme_Mesh":
          str += "Terme Mesh (EN) utilisé pour les Résultats  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Résultats_Synonyme":
          str += "Synonyme (EN) utilisé pour les Résultats  :\n\n\t" + this.formatTable(obj[prop]) + "\n\n\n";
        break;

        case "Equations_Intervention":
          operateurs = obj[prop];
          for(let prop in operateurs)
            switch (prop){
              case "inclureTous" :
                str += "Mots à inclure absolument dans la recherche pour la partie Intervention :\n\n\t" + this.formatTable(operateurs[prop]) + "\n\n\n";
              break;

              case "auMoins1" :
                str += "Au moins un mot de chaque ligne doit être dans la recherche pour la partie Intervention :\n\n\t" + this.formatTableOfTable(operateurs[prop]) + "\n\n\n";
              break;

              case "exclure" :
                str += "Mots à exclure dans la recherche pour la partie Intervention :\n\n\t" + this.formatTable(operateurs[prop]) + "\n\n\n";
              break;
            }
          break;
        case "Equations_Resultats":
          operateurs = obj[prop];
          for(let prop in operateurs)
            switch (prop){
              case "inclureTous" :
                str += "Mots à inclure absolument dans la recherche pour la partie Résultats :\n\n\t" + this.formatTable(operateurs[prop]) + "\n\n\n";
              break;

              case "auMoins1" :
                str += "Au moins un mot de chaque ligne doit être dans la recherche pour la partie Résultats :\n\n\t" + this.formatTableOfTable(operateurs[prop]) + "\n\n\n";
              break;

              case "exclure" :
                str += "Mots à exclure dans la recherche pour la partie Résultats :\n\n\t" + this.formatTable(operateurs[prop]) + "\n\n\n";
              break;
            }
        break;
        case "Equations_PatientPopPath":
           operateurs = obj[prop];
          for(let prop in operateurs)
            switch (prop){
              case "inclureTous" :
                str += "Mots à inclure absolument dans la recherche pour la partie Patien/Population/Pathologie :\n\n\t" + this.formatTable(operateurs[prop]) + "\n\n\n";
              break;

              case "auMoins1" :
                str += "Au moins un mot de chaque ligne doit être dans la recherche pour la partie Patien/Population/Pathologie :\n\n\t" + this.formatTableOfTable(operateurs[prop]) + "\n\n\n";
              break;

              case "exclure" :
                str += "Mots à exclure dans la recherche pour la partie Patien/Population/Pathologie :\n\n\t" + this.formatTable(operateurs[prop]) + "\n\n\n";
              break;
            }
        break;
        case "Equation_Recherche":
         let equation = obj[prop];
          str += "Equation finale :\n\n\t" + equation.text + "\n\n\n";
        break;
        default:
        break;
      }
    }
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });//saving on the user's computer
    saveAs(blob, "questionDeRecherche.txt");
  }

  /** @description This function receive a table of string
  * and turn it into a more user friendly display(String type).
  *@param table containing other table
  *@returns Formated String
  */
  formatTable(table : []) : String{
    let string = table +"";
    return string.replaceAll(",","\n\t");
  }
/** @description This function receive a table that contains tables
  * and turn it into a more user friendly display(String type).
  *@param table containing other tables
  *@returns Formated String
  */
  formatTableOfTable(table : [][]) : String{
    let finalString = "";
    for (let smallTab of table) {
      let str = smallTab.join(",");
      str = str.replaceAll(",", " OR ");
      finalString += str + "\n\n\t";
    }
  return finalString;
  }
}
