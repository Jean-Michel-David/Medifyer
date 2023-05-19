import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {FormControl, FormGroup, FormGroupDirective, NgForm} from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { Operateurs } from '../operateurs';
import { EquationGeneratorService } from 'src/app/services/equation-generator.service';
import { Question } from '../question';
import { ExporterService } from 'src/app/services/exporter.service';
import { QuestionGeneratorService } from 'src/app/services/question-generator.service';
import { UserService } from 'src/app/services/user.service';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { animate, style, transition, trigger } from '@angular/animations';
import {ActivatedRoute,Router} from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-formulaires',
  templateUrl: './formulaires.component.html',
  styleUrls: ['./formulaires.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('100ms', style({ opacity: 1 })),
      ])
    ]),
    trigger('insertTrigger1', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateX(-100%)'}),
        animate('100ms 150ms', style({ opacity: 1 , transform: 'translateX(0%)'})),
      ])
    ]),
    trigger('insertTrigger2', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateX(-100%)'}),
        animate('100ms 300ms', style({ opacity: 1 , transform: 'translateX(0%)'})),
      ])
    ]),
    trigger('insertTrigger3', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateX(-100%)'}),
        animate('100ms 450ms', style({ opacity: 1 , transform: 'translateX(0%)'})),
      ])
    ]),trigger('insertTrigger4', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateX(-100%)'}),
        animate('100ms 600ms', style({ opacity: 1 , transform: 'translateX(0%)'})),
      ])
    ]),
  ]
})
export class FormulairesComponent implements OnInit{

  constructor(
    private fb: FormBuilder,
    private op:EquationGeneratorService,
    private ex:ExporterService,
    private qu:QuestionGeneratorService,
    private userRecherche:UserRechercheService,
    private route:ActivatedRoute,
    private router:Router,
    private message : MessageService
    
    ){}

  inviteUsersFormVisible = false;
  form2Visible = false;
  form3Visible = false;
  equationVisible = false;
  sidebarVisible = false;
  isMessageVisible = false;

  form = this.emptyForm();

  groups:string[] = [
    "Patient / Population / Pathologie",
    "Intervention / Traitement",
    "Résultats"
  ];

  formGroups:string[] = [
    "patient",
    "intervention",
    "resultats"
  ]

  coworkers? : string[];

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      params => {
        if(params['id']){
          let questionRequest = this.userRecherche.developper(params['id']).subscribe(
            question => {
              if(question) this.fillForm(question);
              else this.router.navigateByUrl("/recherche");
              questionRequest.unsubscribe();
            }
            );
        } else {
            this.form = this.emptyForm();
        }
      }
    );
  }

  displayForm2(){
    this.form2Visible = true;
  }
  displayForm3(){
    this.form3Visible = true;
  }
  displayEquation(){
    this.equationVisible = true;
  }

  fillForm(question:Question){
    //Filling the first part
    let firstPart = (this.form.controls['firstPart'] as FormGroup);
    firstPart.controls['privacy'].setValue(question.acces == 0?'private':'public');
    firstPart.controls['question'].setValue(question.Question);
    firstPart.controls['patient'].setValue(question.Patient_Pop_Path);
    firstPart.controls['intervention'].setValue(question.Intervention_Traitement);
    firstPart.controls['resultats'].setValue(question.Résultats);

    //Filling second part
    let secondPart:FormGroup = (this.form.controls['secondPart'] as FormGroup);
    let secondPartPatient:FormGroup = secondPart.controls['patient'] as FormGroup;
    let secondPartTraitement:FormGroup = secondPart.controls['intervention'] as FormGroup;
    let secondPartResultats:FormGroup = secondPart.controls['resultats'] as FormGroup;

    question.Patient_Language_Naturel.forEach(element => {
      (secondPartPatient.controls['natural'] as FormArray).push(this.fb.control(element));
    });
    question.Patient_Terme_Mesh.forEach(element => {
      (secondPartPatient.controls['mesh'] as FormArray).push(this.fb.control(element));
    });
    question.Patient_Synonyme.forEach(element => {
      (secondPartPatient.controls['synonym'] as FormArray).push(this.fb.control(element));
    });

    question.Intervention_Language_Naturel.forEach(element => {
      (secondPartTraitement.controls['natural'] as FormArray).push(this.fb.control(element));
    });
    question.Intervention_Terme_Mesh.forEach(element => {
      (secondPartTraitement.controls['mesh'] as FormArray).push(this.fb.control(element));
    });
    question.Intervention_Synonyme.forEach(element => {
      (secondPartTraitement.controls['synonym'] as FormArray).push(this.fb.control(element));
    });

    question.Résultats_Language_Naturel.forEach(element => {
      (secondPartResultats.controls['natural'] as FormArray).push(this.fb.control(element));
    });
    question.Résultats_Terme_Mesh.forEach(element => {
      (secondPartResultats.controls['mesh'] as FormArray).push(this.fb.control(element));
    });
    question.Résultats_Synonyme.forEach(element => {
      (secondPartResultats.controls['synonym'] as FormArray).push(this.fb.control(element));
    });


      //Filling third part
      let thirdPart:FormGroup = (this.form.controls['thirdPart'] as FormGroup);

      let thirdPartPatient =thirdPart.controls['patient'] as FormGroup;

      question.Equations_PatientPopPath.inclureTous.forEach( element =>{
        (thirdPartPatient.controls['includeAll'] as FormArray).push(this.fb.control(element));
      });

      let includeOnce = (thirdPartPatient.controls['includeOnce'] as FormArray);
      if(question.Equations_PatientPopPath.auMoins1.length > 0) includeOnce.removeAt(0);
      question.Equations_PatientPopPath.auMoins1.forEach( group =>{
        let array = this.fb.array([]);
        group.forEach( element => {
          array.push(this.fb.control(element));
        });
        includeOnce.push(array);
      });

      question.Equations_PatientPopPath.exclure.forEach( element =>{
        (thirdPartPatient.controls['includeNone'] as FormArray).push(this.fb.control(element));
      });

      let thirdPartTraitement =  thirdPart.controls['intervention'] as FormGroup;

      question.Equations_Intervention.inclureTous.forEach( element =>{
        (thirdPartTraitement.controls['includeAll'] as FormArray).push(this.fb.control(element));
      });

      includeOnce = (thirdPartTraitement.controls['includeOnce'] as FormArray);
      if(question.Equations_Intervention.auMoins1.length > 0) includeOnce.removeAt(0);
      question.Equations_Intervention.auMoins1.forEach( group =>{
        let array = this.fb.array([]);
        group.forEach( element => {
          array.push(this.fb.control(element));
        });
        includeOnce.push(array);
      });

      question.Equations_Intervention.exclure.forEach( element =>{
        (thirdPartTraitement.controls['includeNone'] as FormArray).push(this.fb.control(element));
      });

      let thirdPartResultats = thirdPart.controls['resultats'] as FormGroup;

      question.Equations_Resultats.inclureTous.forEach( element =>{
        (thirdPartResultats.controls['includeAll'] as FormArray).push(this.fb.control(element));
      });

      includeOnce = (thirdPartResultats.controls['includeOnce'] as FormArray);
      if(question.Equations_Resultats.auMoins1.length > 0) includeOnce.removeAt(0);
      question.Equations_Resultats.auMoins1.forEach( group =>{
        let array = this.fb.array([]);
        group.forEach( element => {
          array.push(this.fb.control(element));
        });
        includeOnce.push(array);
      });

      question.Equations_Resultats.exclure.forEach( element =>{
        (thirdPartResultats.controls['includeNone'] as FormArray).push(this.fb.control(element));
      });

      //Filling the coworkers list
      this.coworkers = question.coWorker;
  }

  emptyForm():FormGroup{
    let firstPart = this.fb.group({
      privacy: this.fb.control('private'),
      question: [''],
      patient: [''],
      intervention: [''],
      resultats: ['']
    });

    let secondPart = this.fb.group({
      patient: this.fb.group({
        natural: this.fb.array([]),
        mesh: this.fb.array([]),
        synonym: this.fb.array([]),
      }),
      intervention: this.fb.group({
        natural: this.fb.array([]),
        mesh: this.fb.array([]),
        synonym: this.fb.array([]),
      }),
      resultats: this.fb.group({
        natural: this.fb.array([]),
        mesh: this.fb.array([]),
        synonym: this.fb.array([]),
      })
    });

    let thirdPart = this.fb.group({
      patient: this.fb.group({
        includeAll: this.fb.array([]),
        includeOnce: this.fb.array([
          this.fb.array([])
        ]),
        includeNone: this.fb.array([])
      }),
      intervention: this.fb.group({
        includeAll: this.fb.array([]),
        includeOnce: this.fb.array([
          this.fb.array([])
        ]),
        includeNone: this.fb.array([])
      }),
      resultats: this.fb.group({
        includeAll: this.fb.array([]),
        includeOnce: this.fb.array([
          this.fb.array([])
        ]),
        includeNone: this.fb.array([])
      })
    });

    let form = this.fb.group({
      firstPart: firstPart,
      secondPart: secondPart,
      thirdPart: thirdPart
    });

    return form;
  }

  export(){
    let question = this.qu.toQuestion(this.form);
    question.Equation_Recherche = this.op.generateEquation(question).text;
    this.ex.exportData(question);
  }

  save(coworkers? : string[]){
    const req = this.route.queryParams.subscribe(
      params => {
        let question =(coworkers) ? this.qu.toQuestion(this.form, coworkers) : this.qu.toQuestion(this.form);

        if(params['id']){
          question.id = params['id'];
        }

        const sub = this.userRecherche.sauvegarder(question).subscribe((newQuestion: Question) => {
          if(newQuestion != null && this.isMessageVisible == false){
            this.message.add({ severity: 'success', summary: 'Succès', detail: 'Sauvegarde réussie' });
            this.isMessageVisible = true;
            const messageTimer = setTimeout(() => {
              this.message.clear();
              this.isMessageVisible = false;
              clearTimeout(messageTimer);
            }, 2000);
          }
          this.router.navigate(
            [],
            {
              relativeTo: this.route,
              queryParams: {'id': newQuestion['id']},
              queryParamsHandling: 'merge',
              replaceUrl: true
            });

          sub.unsubscribe();
        });
      });
      req.unsubscribe();
  }


  /**********************
  Added by Daniel for sharing the search to other users
  **********************/
  displayInviteUser() {
    this.inviteUsersFormVisible = true;
  }

  onDeleteUser(searchId : string) {
    console.log("deleting user : " + searchId);
  }

  userChosen(user : string, event : Event) {
    event.preventDefault();
    
    this.route.queryParams.subscribe(params => {
      if (! params["id"]) {
        this.inviteUsersFormVisible = false;  
        this.message.add({ severity: 'error', summary: 'Erreur', detail: 'Veuillez d\'abord sauvegarder la recherche' });
        this.isMessageVisible = true;
        const messageTimer = setTimeout(() => {
          this.message.clear();
          this.isMessageVisible = false;
          clearTimeout(messageTimer);
        }, 2000);
      }

      else {

        this.save();
      }

    });

  }
}
