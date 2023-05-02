import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateY(10%)'}),
        animate('200ms', style({ opacity: 1 , transform: 'translateY(0%)'})),
      ])
    ])
  ]
})
export class Form1Component implements OnInit{

  constructor(private fb: FormBuilder) {}

  admin = false;

  @Input()
  firstPart!:FormGroup;

  ngOnInit(): void {
  }
}
