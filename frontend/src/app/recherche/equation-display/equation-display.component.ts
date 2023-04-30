import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionGeneratorService } from 'src/app/services/question-generator.service';

@Component({
  selector: 'app-equation-display',
  templateUrl: './equation-display.component.html',
  styleUrls: ['./equation-display.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ])
    ])
  ]
})
export class EquationDisplayComponent {

  constructor(private qu:QuestionGeneratorService){}

  @Input()
  form!:FormGroup;
}
