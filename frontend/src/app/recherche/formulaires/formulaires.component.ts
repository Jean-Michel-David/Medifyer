import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Operateurs } from '../operateurs';
import { EquationGeneratorService } from 'src/app/services/equation-generator.service';
import { Question } from '../question';
import { ExporterService } from 'src/app/services/exporter.service';
import { QuestionGeneratorService } from 'src/app/services/question-generator.service';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent{

  constructor(private fb: FormBuilder, private op:EquationGeneratorService, private ex:ExporterService, private qu:QuestionGeneratorService) {}
  form2Visible = false;
  form3Visible = false;
  equationVisible = false;

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
  displayEquation(){
    this.equationVisible = true;
  }

  export(){
    this.ex.exportData(this.qu.toQuestion(this.form));
  }
}
