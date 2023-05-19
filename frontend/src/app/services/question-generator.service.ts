import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Operateurs } from '../recherche/operateurs';
import { EquationGeneratorService } from './equation-generator.service';
import { Question } from '../recherche/question';
import { Equation } from '../recherche/equation';

@Injectable({
  providedIn: 'root'
})
export class QuestionGeneratorService {

  constructor(private op:EquationGeneratorService) { }

  /**Generates a Question based on the form
   *
   * @param form The form needed to generate the question
   */
  toQuestion(form:FormGroup, coworkers? : string[]):Question{

    var question:Question = {
      id :0,
      acces:((form as FormGroup).controls["firstPart"] as FormGroup).controls["privacy"].value == "private" ? 0:1,
      commentaires:"",
      coWorker : (coworkers) ? coworkers : [],
      Question : ((form as FormGroup).controls["firstPart"] as FormGroup).controls["question"].value ?? "" ,
      Patient_Pop_Path : ((form as FormGroup).controls["firstPart"] as FormGroup).controls["patient"].value ?? "",
      Intervention_Traitement : ((form as FormGroup).controls["firstPart"] as FormGroup).controls["intervention"].value ?? "",
      Résultats : ((form as FormGroup).controls["firstPart"] as FormGroup).controls["resultats"].value ?? "",

      Patient_Language_Naturel : ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["patient"] as FormGroup).controls["natural"] as FormArray).controls.map(control => control.value as string),
      Patient_Terme_Mesh :  ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["patient"] as FormGroup).controls["mesh"] as FormArray).controls.map(control => control.value as string),
      Patient_Synonyme :  ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["patient"] as FormGroup).controls["synonym"] as FormArray).controls.map(control => control.value as string),

      Intervention_Language_Naturel :  ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["intervention"] as FormGroup).controls["natural"] as FormArray).controls.map(control => control.value as string),
      Intervention_Terme_Mesh : ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["intervention"] as FormGroup).controls["mesh"] as FormArray).controls.map(control => control.value as string),
      Intervention_Synonyme : ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["intervention"] as FormGroup).controls["synonym"] as FormArray).controls.map(control => control.value as string),

      Résultats_Language_Naturel : ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["resultats"] as FormGroup).controls["natural"] as FormArray).controls.map(control => control.value as string),
      Résultats_Terme_Mesh : ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["resultats"] as FormGroup).controls["mesh"] as FormArray).controls.map(control => control.value as string),
      Résultats_Synonyme : ((((form as FormGroup).controls["secondPart"] as FormGroup).controls["resultats"] as FormGroup).controls["synonym"] as FormArray).controls.map(control => control.value as string),

      Equations_PatientPopPath : this.toOperateurs(((form as FormGroup).controls['thirdPart'] as FormGroup).controls['patient'] as FormGroup),
      Equations_Intervention : this.toOperateurs(((form as FormGroup).controls['thirdPart'] as FormGroup).controls['intervention'] as FormGroup),
      Equations_Resultats : this.toOperateurs(((form as FormGroup).controls['thirdPart'] as FormGroup).controls['resultats'] as FormGroup),

      Equation_Recherche : ""
    }

    return question;
  }

  /**Generates an Equation based on the form
   *
   * @param form The form needed to generate the equation
   */
  toEquation(form:FormGroup):Equation{
    return this.op.generateEquation(this.toQuestion(form));
  }

  /**Generates Operateurs based on a FormGroup
   *
   * @param group The group transformed in Operateurs
   */
  toOperateurs(group:FormGroup):Operateurs{

    let operateurs:Operateurs = {
      inclureTous:(group.controls['includeAll'] as FormArray).controls.map( element => element.value as string),
      auMoins1:(group.controls['includeOnce'] as FormArray).controls.filter(element => (element as FormArray).length > 0).map( element => element.value as string[]),
      exclure:(group.controls['includeNone'] as FormArray).controls.map( element => element.value as string)
    };

    return operateurs;

  }
}
