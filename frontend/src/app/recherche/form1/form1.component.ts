import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit{

  constructor(private fb: FormBuilder) {}

  admin = false;

  @Input()
  firstPart!:FormGroup;

  ngOnInit(): void {
  }
}
