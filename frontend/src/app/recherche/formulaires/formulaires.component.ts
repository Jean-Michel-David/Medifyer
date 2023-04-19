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

  toOperateurs():Operateurs{

    let operateurs:Operateurs = {
      inclureTous:[],
      auMoins1:[],
      exclure:[]
    };

    var groups:FormGroup[] = [this.thirdPart.controls['patient'],this.thirdPart.controls['intervention'],this.thirdPart.controls['resultats']];

    groups.forEach(group =>{
      (group.controls['includeAll'] as FormArray).controls.forEach( element => {
        operateurs.inclureTous.push(element.value as string);
      });

      (group.controls['includeOnce'] as FormArray).controls.forEach( element => {
        operateurs.auMoins1.push(element.value as string[])
      });

      (group.controls['includeNone'] as FormArray).controls.forEach( element => {
        operateurs.exclure.push(element.value as string);
      });
    })

    return operateurs;

  }

  /*toQuestion():Question{
    var question:Question = {
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
  
      Equations_PatientPopPath :,
      Equations_Intervention : this.mockOperateurs,
      Equations_Resultats : this.mockOperateurs
    }
  }*/

  printOperateurs(){
    console.log(this.toOperateurs())
  }
}
