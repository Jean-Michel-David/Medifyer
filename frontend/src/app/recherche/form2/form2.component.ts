import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit{
  @Input()
  secondPart!:FormGroup;



  constructor(private fb : FormBuilder){}

  ngOnInit(): void {
  }

  addTerm(group:string,column:string){
    ((this.secondPart.controls[group] as FormGroup).controls[column] as FormArray).push(this.fb.control(''));
  }
}
