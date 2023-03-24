import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';
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
    for (let prop in obj) {//reformat of the obj into a string
      if (obj.hasOwnProperty(prop)) {
        if(prop == "Equations_PatientPopPath" || prop == "Equations_Intervention" || prop == "Equations_Resultats"){
          let string = obj[prop] +"";
          let arr = string.split(",");

          for (let i = 3; i < arr.length; i += 4) {
            arr[i - 1] += ',';
          }
          string = arr.join(" ");
          str += prop + " : " + string + "\n\n";
        }
        else str += prop + " : " + obj[prop] + "\n\n";
      }
    }
    const blob = new Blob([str], { type: "text/plain;charset=utf-8" });//saving on the user's computer
    saveAs(blob, "questionDeRecherche.txt");
  }
}
