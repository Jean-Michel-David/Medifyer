import { Injectable } from '@angular/core';
import { Equation } from '../recherche/equation';
import { Operateurs } from '../recherche/operateurs';
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
  public generateEquation(question : Question) : Equation {
    let equation = {
      text : "",
      numberOfArticles : 0
    }

    equation.text = this.getEquationBit(question.Equations_PatientPopPath)
      .concat(" AND ")
      .concat(this.getEquationBit(question.Equations_Intervention))
      .concat(" AND ")
      .concat(this.getEquationBit(question.Equations_Resultats));
    return equation;
  }

  /**
   * This function will create a PubMed ready string from a Operator object
   * @param op Operator object from which you need the equation string
   * @returns The equation srting concerning the given Operator
   */
  private getEquationBit(op : Operateurs) : string {
    let str = "";

    if (op.inclureTous.length > 0) {
      str += this.concatTerms(op.inclureTous, "AND");
    }
    
    if (op.auMoins1.length > 0) {
      op.auMoins1.forEach((entry) => {
        if (str.length > 0) str += " AND ";
        
        str += this.concatTerms(entry, "OR");
      });
    }

    if (op.exclure.length > 0) {    
      str += " NOT " + this.concatTerms(op.exclure, "OR");
    }
    
    return str;
  }

  /**
   * This function concats the given terms with the given operator for them to be used in a 
   * @param termes Terms from which to create the desired string
   * @returns a string formatted from the terms to include
   */
  private concatTerms(termes : string[], operator : string) : string {
    let str = "(" + termes[0];

    for(let i = 1; i < termes.length; i++)
      str += ` ${operator} ` + termes[i];

    return str.concat(")");
  }
}
