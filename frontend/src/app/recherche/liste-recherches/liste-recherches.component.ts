import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionShort } from '../question-short';

@Component({
  selector: 'app-liste-recherches',
  templateUrl: './liste-recherches.component.html',
  styleUrls: ['./liste-recherches.component.css']
})
export class ListeRecherchesComponent {
  @Input() userSearches! : Observable<QuestionShort[]>;

  onDevelopQuestion(e : any, id : number) : void {
    console.log("Question with ID : " + id + " selected for development");
  }
}
