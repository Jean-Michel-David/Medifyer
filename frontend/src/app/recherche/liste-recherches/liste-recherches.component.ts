import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { Question } from '../question';
import { QuestionShort } from '../question-short';

@Component({
  selector: 'app-liste-recherches',
  templateUrl: './liste-recherches.component.html',
  styleUrls: ['./liste-recherches.component.css']
})
export class ListeRecherchesComponent implements OnInit{

  @Input()
  userSearches! : Observable<QuestionShort[]>;
  @Output()
  question = new EventEmitter<Question>;

  recherches! : Observable<QuestionShort[]>;

  constructor(protected api : UserRechercheService){}

  ngOnInit(): void {
    this.getQuestions();
  }

  onDevelopQuestion(e : any, id : number) : void {
    const sub = this.api.developper(id).subscribe((question) => {
      this.question.emit(question);
      sub.unsubscribe();
    });
  }

  getQuestions() {
    this.recherches = this.api.afficher();
  }
}
