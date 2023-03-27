import { Injectable } from '@angular/core';
import { Equation } from '../recherche/equation';
import { Question } from '../recherche/question';
@Injectable({
  providedIn: 'root'
})
export class EquationGeneratorService {

  constructor() { }

  /** This function will generate the pubmed ready search equation.
   *  @param question An object of type 'Question' from which the method shall extract the relevant informations
   *  @returns The equation string to be used in pubmed
   */
  generateEquation(question : Question) : Equation {
    /**
     *  Final string example : 
     * ("Vestibular Diseases"[Mesh] OR "Vertigo"[Mesh] OR "Dizziness"[Mesh])
     *  AND 
     * ("Virtual Reality"[Mesh] OR "Virtual Reality Exposure Therapy"[Mesh]) 
     * AND 
     * "Quality of Life"[Mesh]
    */
    let equation = {
      text : "",
      numberOfArticles : null
    };
    
    //Patients : 
    question.Equations_PatientPopPath.forEach(entry => {
      equation.text = equation.text.concat(this.addEntrySet(entry));
    });

    return equation;
  }

  private addEntrySet(entry : string[]) : string {
    let entrySet = "";
    switch (entry.length) {
      case 2:
        // If the term is alone
        entrySet = entrySet.concat(entry[1]);
        break;

      case 3 :
        let firstTerm = entry[0];
        let relation = entry[1];
        let secondTerm = entry[2];

        break;

      default:
        //If there is a problem with the entry, we don't take it into account.
        break;
      }
    return "";
  }
}
