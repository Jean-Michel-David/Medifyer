import { Injectable } from '@angular/core';
import { Equation } from '../recherche/equation';
import { Operateurs } from '../recherche/operateurs';
import { Question } from '../recherche/question';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EquationGeneratorService {

  constructor(private http : HttpClient) { }

  /** This function will generate the pubmed ready search equation.
   *  @param question An object of type 'Question' from which the method shall extract the relevant informations
   *  @returns The equation string to be used in pubmed
   */
  public generateEquation(question : Question) : Equation {
    let equation = {
      text : "",
      numberOfArticles : 0
    }

    if (!this.isEmptyOp(question.Equations_PatientPopPath))
      equation.text = this.getEquationBit(question.Equations_PatientPopPath);
    
    if (!this.isEmptyOp(question.Equations_Intervention)) {
      if (equation.text.length > 0)
        equation.text += " AND ";
      equation.text += this.getEquationBit(question.Equations_Intervention);
    }
    
    if (!this.isEmptyOp(question.Equations_Resultats)) {
      if (equation.text.length > 0)
        equation.text += " AND ";
      equation.text += this.getEquationBit(question.Equations_Resultats);
    }

    equation.text = equation.text.replaceAll("AND NOT", "NOT");

    return equation;
  }

  private isEmptyOp(op : Operateurs) : boolean {
    return (
      op.auMoins1.length == 0 &&
      op.exclure.length == 0 &&
      op.inclureTous.length == 0
    );
  }

  /**
   * This function will create a PubMed ready string from a Operator object
   * @param op Operator object from which you need the equation string
   * @returns The equation srting concerning the given Operator
   */
  private getEquationBit(op : Operateurs) : string {
    let str = "";

    if (typeof op.inclureTous !== 'undefined' && op.inclureTous.length > 0) {
      str += this.concatTerms(op.inclureTous, "AND");
    }
    
    if (typeof op.auMoins1 !== 'undefined' && op.auMoins1.length > 0) {
      op.auMoins1.forEach((entry) => {
        if (str.length > 0) str += " AND ";
        
        str += this.concatTerms(entry, "OR");
      });
    }

    if (typeof op.exclure !== 'undefined' && op.exclure.length > 0) {    
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
