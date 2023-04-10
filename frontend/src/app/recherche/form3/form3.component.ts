import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class Form3Component implements OnInit{

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.secondPart = this.formGlobal.controls['secondPart'] as FormGroup;
    this.thirdPart = this.formGlobal.controls['thirdPart'] as FormGroup;
    this.patientPart = this.thirdPart.controls['patient'] as FormGroup;
    this.interventionPart = this.thirdPart.controls['intervention'] as FormGroup;
    this.resultatsPart = this.thirdPart.controls['resultats'] as FormGroup;


  }
  @Input()
  formGlobal!:FormGroup;

  thirdPart!:FormGroup;
  secondPart!:FormGroup;

  patientPart!:FormGroup;
  interventionPart!:FormGroup;
  resultatsPart!:FormGroup;

}
