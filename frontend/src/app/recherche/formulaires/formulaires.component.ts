import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Operateurs } from '../operateurs';
import { EquationGeneratorService } from 'src/app/services/equation-generator.service';
import { Question } from '../question';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent{

  constructor(private fb: FormBuilder, private op:EquationGeneratorService) {}
  form2Visible = false;
  form3Visible = false;

  firstPart = this.fb.group({
    question: [''],
    patient: [''],
    intervention: [''],
    resultats: ['']
  });

  secondPart = this.fb.group({
    patient: this.fb.group({
      natural: this.fb.array([]),
      mesh: this.fb.array([]),
      synonym: this.fb.array([]),
    }),
    intervention: this.fb.group({
      natural: this.fb.array([]),
      mesh: this.fb.array([]),
      synonym: this.fb.array([]),
    }),
    resultats: this.fb.group({
      natural: this.fb.array([]),
      mesh: this.fb.array([]),
      synonym: this.fb.array([]),
    })
  });

  thirdPart = this.fb.group({
    patient: this.fb.group({
      includeAll: this.fb.array([]),
      includeOnce: this.fb.array([
        this.fb.array([])
      ]),
      includeNone: this.fb.array([])
    }),
    intervention: this.fb.group({
      includeAll: this.fb.array([]),
      includeOnce: this.fb.array([
        this.fb.array([])
      ]),
      includeNone: this.fb.array([])
    }),
    resultats: this.fb.group({
      includeAll: this.fb.array([]),
      includeOnce: this.fb.array([
        this.fb.array([])
      ]),
      includeNone: this.fb.array([])
    })
  });

  form = this.fb.group({
    firstPart: this.firstPart,
    secondPart: this.secondPart,
    thirdPart: this.thirdPart
  });

  groups:string[] = [
    "Patient / Population / Pathologie",
    "Intervention / Traitement",
    "Résultats"
  ];

  formGroups:string[] = [
    "patient",
    "intervention",
    "resultats"
  ]

  displayForm2(){
    this.form2Visible = true;
  }
  displayForm3(){
    this.form3Visible = true;
  }

  toOperateurs(group:FormGroup):Operateurs{

    let operateurs:Operateurs = {
      inclureTous:(group.controls['includeAll'] as FormArray).controls.map( element => element.value as string),
      auMoins1:(group.controls['includeOnce'] as FormArray).controls.filter(element => (element as FormArray).length > 0).map( element => element.value as string[]),
      exclure:(group.controls['includeNone'] as FormArray).controls.map( element => element.value as string)
    };

    return operateurs;

  }

  toQuestion():Question{
    var question:Question = {
      id :0,
      acces:1,
      commentaires:"",
      coWorker : [],
      Question : this.form.controls["firstPart"].controls["question"].value ?? "" ,
      Patient_Pop_Path : this.form.controls["firstPart"].controls["patient"].value ?? "",
      Intervention_Traitement : this.form.controls["firstPart"].controls["intervention"].value ?? "",
      Résultats : this.form.controls["firstPart"].controls["resultats"].value ?? "",
  
      Patient_Language_Naturel : this.form.controls["secondPart"].controls["patient"].controls["natural"].controls.map(control => control.value as string),
      Patient_Terme_Mesh :  this.form.controls["secondPart"].controls["patient"].controls["mesh"].controls.map(control => control.value as string),
      Patient_Synonyme :  this.form.controls["secondPart"].controls["patient"].controls["synonym"].controls.map(control => control.value as string),
  
      Intervention_Language_Naturel :  this.form.controls["secondPart"].controls["intervention"].controls["natural"].controls.map(control => control.value as string),
      Intervention_Terme_Mesh : this.form.controls["secondPart"].controls["intervention"].controls["mesh"].controls.map(control => control.value as string),
      Intervention_Synonyme : this.form.controls["secondPart"].controls["intervention"].controls["synonym"].controls.map(control => control.value as string),
  
      Résultats_Language_Naturel : this.form.controls["secondPart"].controls["resultats"].controls["natural"].controls.map(control => control.value as string),
      Résultats_Terme_Mesh : this.form.controls["secondPart"].controls["resultats"].controls["mesh"].controls.map(control => control.value as string),
      Résultats_Synonyme : this.form.controls["secondPart"].controls["resultats"].controls["synonym"].controls.map(control => control.value as string),
  
      Equations_PatientPopPath : this.toOperateurs(this.form.controls['thirdPart'].controls['patient']),
      Equations_Intervention : this.toOperateurs(this.form.controls['thirdPart'].controls['intervention']),
      Equations_Resultats : this.toOperateurs(this.form.controls['thirdPart'].controls['resultats'])
    }

    return question;
  }

  toEquation(){
    console.log(this.toOperateurs(this.form.controls['thirdPart'].controls['patient']));
    console.log(this.op.generateEquation(this.toQuestion()));
  }

  exporter(){
    
  }
}
