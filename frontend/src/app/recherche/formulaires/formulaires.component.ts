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

  form = this.fb.group({
    firstPart: this.firstPart
  });

  displayForm2(){
    this.form2Visible = true;
  }
  displayForm3(){
    this.form3Visible = true;
  }
}
