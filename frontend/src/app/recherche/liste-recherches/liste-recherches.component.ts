import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { QuestionShort } from '../question-short';

@Component({
  selector: 'app-liste-recherches',
  templateUrl: './liste-recherches.component.html',
  styleUrls: ['./liste-recherches.component.css']
})
export class ListeRecherchesComponent implements OnInit{

  @Input()
  userSearches! : Observable<QuestionShort[]>;

  recherches! : Observable<QuestionShort[]>;

  constructor(protected api : UserRechercheService){}
  ngOnInit(): void {
    this.getQuestions();
  }
  onDevelopQuestion(e : any, id : number) : void {
    console.log("Question with ID : " + id + " selected for development");
  }

  getQuestions() {
    this.recherches = this.api.afficher();
  }
}
