import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EquationGeneratorService } from 'src/app/services/equation-generator.service';
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

  recherches! : Observable<QuestionShort[]>;

  constructor(
    protected api : UserRechercheService,
    protected api2 : EquationGeneratorService,
    protected router: Router
    ){}

  ngOnInit(): void {
    this.getQuestions();
  }

  onDevelopQuestion(e : any, id : number) : void {
    const sub = this.api.developper(id).subscribe((question) => {
      question.Equation_Recherche = this.api2.generateEquation(question).text;
      this.router.navigate(['recherche'],{queryParams:question});
      sub.unsubscribe();
    });
  }

  getQuestions() {
    this.recherches = this.api.afficher();
  }
}
