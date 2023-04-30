import { animate, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
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
export class EquationDisplayComponent implements AfterViewInit{

  constructor(private qu:QuestionGeneratorService){}

  @Input()
  form!:FormGroup;
  @ViewChild('equationInput')
  input!:ElementRef<HTMLTextAreaElement>;

  counter:Number = 0;

  ngAfterViewInit(): void {
    this.displayEquation();
  }

  displayEquation(){
    let equation = this.qu.toEquation(this.form);
    this.input.nativeElement.value = equation.text;
    this.counter = equation.numberOfArticles ?? 0;
    console.log(equation.numberOfArticles);
  }

  copyToClipboard(){
  }
}
