import { animate, style, transition, trigger } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
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

  constructor(private qu:QuestionGeneratorService,private http:HttpClient){}

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
    let req = this.http.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=pubmed&term='+ equation.text,{responseType: 'text'}).subscribe(
      response => {
        let parser = new DOMParser();
        let xml = parser.parseFromString(response, 'text/xml');
        if(xml.getElementsByTagName('eSearchResult')[0].getElementsByTagName('Count').length > 0){
          this.counter = parseInt(xml.getElementsByTagName('eSearchResult')[0].getElementsByTagName('Count')[0].innerHTML ?? '0');
        } else {
          this.counter = 0;
        }


        req.unsubscribe();
      }
    )
  }
}
