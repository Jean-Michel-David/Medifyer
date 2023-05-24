import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { isEmpty, Observable } from 'rxjs';
import { EquationGeneratorService } from 'src/app/services/equation-generator.service';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Question } from '../question';
import { QuestionShort } from '../question-short';
import { ConfirmationService, PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-liste-recherches',
  templateUrl: './liste-recherches.component.html',
  styleUrls: ['./liste-recherches.component.css']
})
export class ListeRecherchesComponent implements OnInit{

  @Input()
  userSearches! : Observable<QuestionShort[]>;
  @Input()
  sharedSearches! : Observable<QuestionShort[]>;

  @Output()
  sharedUserSearches : EventEmitter<Question> = new EventEmitter();

  recherches! : Observable<QuestionShort[]>;

  mySearches = true;

  @ViewChild('divDeBase', {static: false}) divDeBase!: ElementRef;
  @ViewChild('divDeBase2', {static: false}) divDeBase2!: ElementRef;
  constructor(
    protected api : UserRechercheService,
    protected api2 : EquationGeneratorService,
    protected router: Router,
    private confirmation: ConfirmationService,
    private primengConfig: PrimeNGConfig
    ){}

  ngOnInit(): void {
    this.getQuestions();
  }

  onDevelopQuestion(e : any, id : number) : void {
    const sub = this.api.developper(id).subscribe((question) => {
      question.question.Equation_Recherche = this.api2.generateEquation(question.question).text;
      this.router.navigate(['recherche'],{queryParams:{id : question.question.id}});
      sub.unsubscribe();
    });
  }

  onDeleteQuestion(e : any, id : number) : void {
    this.confirmation.confirm({
      message: 'Etes-vous certain de vouloir supprimer cette question?',
      header: 'Confirmation',
      acceptLabel: 'Supprimer',
      rejectLabel: 'Annuler',
      acceptButtonStyleClass: 'custom-accept-button',
      rejectButtonStyleClass: 'custom-reject-button',
      accept:()=>{
        const sub = this.api.supprimer(id).subscribe(() => {
          this.getQuestions();
        sub.unsubscribe();
      });},
      reject:()=>{}
  });

  }
  getQuestions() {
    this.recherches = this.api.afficher();
    this.recherches.subscribe(reponse =>{
      if(reponse.length == 0 && this.userSearches == undefined)
        this.divDeBase.nativeElement.textContent = "Aucune question de recherche pour le moment";
    });
    if(this.userSearches)
      this.userSearches.subscribe(reponse=>{
        if(reponse == null)
          this.divDeBase.nativeElement.textContent = "Aucune question de recherche pour le moment";
      });
  }

  getQuestionsPartagees(){
    this.recherches = this.api.afficherPartage();
    this.recherches.subscribe(reponse =>{
      if(reponse.length == 0 && this.userSearches == undefined)
        this.divDeBase2.nativeElement.textContent = "Aucune question de recherche n'a été partagée avec vous pour le moment";
    });
    if(this.sharedSearches)
      this.sharedSearches.subscribe(reponse=>{
        if(reponse == null)
          this.divDeBase2.nativeElement.textContent = "Aucune question de recherche n'a été partagée avec vous pour le moment";
      });
  }

  switchView(mySearches : boolean){
    this.mySearches = mySearches
  }
}
