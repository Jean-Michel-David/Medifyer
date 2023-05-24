import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { InfosService } from 'src/app/services/infos.service';

@Component({
  selector: 'app-form3',
  templateUrl: './form3.component.html',
  styleUrls: ['./form3.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 , transform: 'translateY(10%)'}),
        animate('200ms', style({ opacity: 1 , transform: 'translateY(0%)'})),
      ])
    ])
  ]
})
export class Form3Component implements OnInit{

  @Input()
  formGlobal!:FormGroup;
  @Input()
  formGroups!:string[];
  @Input()
  groups!:string[];

  thirdPart!:FormGroup;
  secondPart!:FormGroup;

  selectedControlOrigin!:FormArray;
  selectedControlOriginIndex!:number;
  selectedControl:FormControl | null = null;

  info:String = "";

  constructor(
    private fb: FormBuilder,
    private route:ActivatedRoute,
    private infoBulle:InfosService,
    ) {
      let infoReq = this.infoBulle.getInfo('infobulle_thirdPart').subscribe(response => {
        if(response) this.info = response.text.replace('\r','<br>');
        infoReq.unsubscribe();
      });
    }

  ngOnInit(): void {
    this.secondPart = this.formGlobal.controls['secondPart'] as FormGroup;
    this.thirdPart = this.formGlobal.controls['thirdPart'] as FormGroup;

    let req = this.route.queryParams.subscribe(
      params => {
        if(!params['id']){
          this.generate();
        }
      }
    );
  }

  addIncludeOnce(group:string){
    ((this.thirdPart.controls[group] as FormGroup).controls['includeOnce'] as FormArray).push(this.fb.array([]));
  }

  removeIncludeOnce(group:string,index:number){
    let includeOnce = ((this.thirdPart.controls[group] as FormGroup).controls['includeOnce'] as FormArray);

    for (let i = 0; i < (includeOnce.at(index) as FormArray).length; i++) {
      (includeOnce.at(0) as FormArray).push((includeOnce.at(index) as FormArray).at(i))
    }

    includeOnce.removeAt(index);
  }

  reset(){
    let groups = ['patient', 'intervention', 'resultats'];
    groups.forEach(element => {
      let target = (this.thirdPart.controls[element] as FormGroup);
      (target.controls['includeAll'] as FormArray).clear();
      (target.controls['includeNone'] as FormArray).clear();
      (target.controls['includeOnce'] as FormArray).clear();
      (target.controls['includeOnce'] as FormArray).push(this.fb.array([]));

    })

  }

  generate():void {
    this.reset();

    let groups = ['patient', 'intervention', 'resultats'];
    groups.forEach(element => {
      let target = (this.thirdPart.controls[element] as FormGroup).controls['includeAll'] as FormArray;

      let array = ((this.secondPart.controls[element] as FormGroup).controls['mesh'] as FormArray);
      let length = array.length;
      for (let i = 0; i < length; i++) {
        if((array.at(i) as FormControl).value.length > 0) target.push(this.fb.control(array.at(i).value + '[Mesh]'));
      }

      array = ((this.secondPart.controls[element] as FormGroup).controls['synonym'] as FormArray);
      length = array.length;
      for (let i = 0; i < length; i++) {
        if((array.at(i) as FormControl).value.length > 0) target.push(array.at(i));
      }
    });
  }

  dragStart(control: FormControl,group:string,include:string,index:number){
    this.selectedControl = control;
    this.selectedControlOrigin =  ((this.thirdPart.controls[group] as FormGroup).controls[include] as FormArray);
    this.selectedControlOriginIndex = index;
  }

  dragStartIncludeOnce(control: FormControl,group:string,includeIndex:number,index:number){
    this.selectedControl = control;
    this.selectedControlOrigin =  ((this.thirdPart.controls[group] as FormGroup).controls['includeOnce'] as FormArray).at(includeIndex) as FormArray;
    this.selectedControlOriginIndex = index;
  }

  dragEnd(){
    this.selectedControl = null;
  }

  drop(group:string,include:string){
    if(this.selectedControl != null){
      let target = (this.thirdPart.controls[group] as FormGroup).controls[include] as FormArray;
      target.push(this.selectedControl);
      this.selectedControlOrigin.removeAt(this.selectedControlOriginIndex);
    }
  }

  dropIncludeOnce(group:string,include:number){
    if(this.selectedControl != null){
      let target = ((this.thirdPart.controls[group] as FormGroup).controls['includeOnce'] as FormArray).at(include) as FormArray;
      target.push(this.selectedControl);
      this.selectedControlOrigin.removeAt(this.selectedControlOriginIndex);
    }
  }
}
