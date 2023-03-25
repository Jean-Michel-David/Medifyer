import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent{

  constructor(private fb: FormBuilder) {}
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
      natural: this.fb.array([this.fb.control('')]),
      mesh: this.fb.array([this.fb.control('')]),
      synonym: this.fb.array([this.fb.control('')]),
    }),
    intervention: this.fb.group({
      natural: this.fb.array([this.fb.control('')]),
      mesh: this.fb.array([this.fb.control('')]),
      synonym: this.fb.array([this.fb.control('')]),
    }),
    resultats: this.fb.group({
      natural: this.fb.array([this.fb.control('')]),
      mesh: this.fb.array([this.fb.control('')]),
      synonym: this.fb.array([this.fb.control('')]),
    })
  });

  form = this.fb.group({
    firstPart: this.firstPart,
    secondPart: this.secondPart
  });

  displayForm2(){
    this.form2Visible = true;
  }
  displayForm3(){
    this.form3Visible = true;
  }
}
