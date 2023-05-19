import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Info } from 'src/app/info';
import { InfosService } from 'src/app/services/infos.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateY(10%)'}),
        animate('200ms', style({ opacity: 1 , transform: 'translateY(0%)'})),
      ])
    ])
  ]
})
export class Form1Component{

  admin = false;

  infoQuestionLabel= 'Question de recherche';
  infoQuestionText = '';
  infoPopulationLabel = 'Patient / Population / Pathologie';
  infoPopulationText = '';
  infoTraitementLabel = 'Intervention / Traitement';
  infoTraitementText = '';
  infoResultatLabel = 'Résultats';
  infoResultatText = '';

  stateOptions: any[] = [{label: 'Privée', value: 'private'}, {label: 'Publique', value: 'public'}];

  @Input()
  firstPart!:FormGroup;

  @Input()
  isConnected!:boolean;

  isNew!:boolean;

  constructor(
    private fb: FormBuilder,
    private infoBulle:InfosService,
    private route:ActivatedRoute
    ) {
      this.route.queryParams.subscribe(params =>{
        if(params['id']){
         this.isNew=false;
        } else {
          this.isNew=true;
        }
      });

      //Initializing Question Infobulle
      let infoReqQuestion = this.infoBulle.getInfo('infobulle_questionDeRecherche').subscribe(response => {
        if(response) this.infoQuestionText = response.text.replace('\r','<br>');
        infoReqQuestion.unsubscribe();
      });


      //Initializing Population Infobulle
      let infoReqPopulation = this.infoBulle.getInfo('infobulle_PatientPopPath').subscribe(response => {
        if(response) this.infoPopulationText = response.text.replace('\r','<br>');
        infoReqPopulation.unsubscribe();
      });

      //Initializing Traitement Infobulle
      let infoReqTraitement = this.infoBulle.getInfo('infobulle_interventionTraitement').subscribe(response => {
        if(response) this.infoTraitementText = response.text.replace('\r','<br>');
        infoReqTraitement.unsubscribe();
      });

      //Initializing Resultat Infobulle
      let infoReqResultat = this.infoBulle.getInfo('infobulle_resultat').subscribe(response => {
        if(response) this.infoResultatText = response.text.replace('\r','<br>');
        infoReqResultat.unsubscribe();
      });
    }
}
