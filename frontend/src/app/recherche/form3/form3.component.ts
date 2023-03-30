import { animate, keyframes, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
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
export class Form3Component {
  @Input()
  formGlobal!:FormGroup;

  thirdPart:FormGroup = (this.formGlobal.controls['thirdPart'] as FormGroup);


}
