import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TimeInterval } from 'rxjs';


@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit{
  @Input()
  secondPart!:FormGroup;
  @Input()
  formGroups!:string[];
  @Input()
  groups!:string[];

  constructor(private fb : FormBuilder,private http:HttpClient){}

  ngOnInit(): void {
  }

  addTerm(group:string,column:string){
    ((this.secondPart.controls[group] as FormGroup).controls[column] as FormArray).push(this.fb.control(''));
  }

  checkEmptyWhenLeaving(event:Event,group:string,category:string,term:number):boolean{
    let meshTerm = (((this.secondPart.controls[group] as FormGroup).controls[category] as FormArray).at(term).value);
    let length = ((this.secondPart.controls[group] as FormGroup).controls[category] as FormArray).length;
    if(meshTerm.length <= 0 ){
      ((this.secondPart.controls[group] as FormGroup).controls[category] as FormArray).removeAt(term);
      return false;
    }
    return true;
  }

  checkMeshTerm(event:Event,group:string,term:number){
    if(this.checkEmptyWhenLeaving(event,group,"mesh",term)){
      let meshTerm = (((this.secondPart.controls[group] as FormGroup).controls['mesh'] as FormArray).at(term).value);
      if(meshTerm.length > 1){
        let req = this.http.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=mesh&term='
        + meshTerm
        +'[Mesh]',
        {responseType: 'text'}).subscribe(
          response => {
            let parser = new DOMParser();
            let xml = parser.parseFromString(response, 'text/xml');
            let count:number = parseInt(xml.getElementsByTagName('eSearchResult')[0].getElementsByTagName('Count')[0].innerHTML);
            if(count>0){
              (event.target as HTMLElement).classList.add('valid');
              (event.target as HTMLElement).classList.remove('notvalid');
            } else {
              (event.target as HTMLElement).classList.add('notvalid');
              (event.target as HTMLElement).classList.remove('valid');
            }
            req.unsubscribe();
        });
      } else {
        (event.target as HTMLElement).classList.remove('valid');
        (event.target as HTMLElement).classList.remove('notvalid');
      }
    }

  }

  checkTimer(event:Event){
  }

  moveTerm(event:Event,group:string,term:number){
    let synonym = ((this.secondPart.controls[group] as FormGroup).controls['synonym'] as FormArray);
    let mesh = ((this.secondPart.controls[group] as FormGroup).controls['mesh'] as FormArray);
    let foundEmpty = false;

    for (let i = 0; i < synonym.length; i++) {
      const element = synonym.at(i);
      if (element.value.length <= 0){
        synonym.setControl(i , this.fb.control(mesh.at(term).value));
        foundEmpty = true;
      }
    }

    if(!foundEmpty) {synonym.push(this.fb.control(mesh.at(term).value));}

    mesh.removeAt(term);
  }

  checkIfEmpty(category:string,group:string){
    let length = ((this.secondPart.controls[group] as FormGroup).controls[category] as FormArray).length;
    let formArray = ((this.secondPart.controls[group] as FormGroup).controls[category] as FormArray);
    if( length == 0 || (formArray.at(length- 1)).value.length > 0){
      return true;
    } else {
      return false;
    }
  }
}
