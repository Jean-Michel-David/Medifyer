import { Component, OnInit, ViewChild } from '@angular/core';
import {FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css']
})
export class FormulairesComponent{

  
  constructor(private fb: FormBuilder) {}

  firstPart = this.fb.group({
    firstName: ['']
  })
  
  form = this.fb.group({
    name: [''],
    firstPart: this.firstPart
  })

 
}
