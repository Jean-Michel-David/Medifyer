import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-form2',
  templateUrl: './form2.component.html',
  styleUrls: ['./form2.component.css']
})
export class Form2Component implements OnInit{
  @Input()
  secondPart!:FormGroup;
  @ViewChild('formTerms')
  formTerms!: ElementRef;



  constructor(private fb : FormBuilder,private http:HttpClient){}

  ngOnInit(): void {
  }

  addTerm(group:string,column:string){
    ((this.secondPart.controls[group] as FormGroup).controls[column] as FormArray).push(this.fb.control(''));
  }

  checkMeshTerm(event:Event,group:string,term:number){
    if((((this.secondPart.controls[group] as FormGroup).controls['mesh'] as FormArray).at(term).value).length > 1){
      let req = this.http.get('https://eutils.ncbi.nlm.nih.gov/entrez/eutils/esearch.fcgi?db=mesh&term='
      + ((this.secondPart.controls[group] as FormGroup).controls['mesh'] as FormArray).at(term).value
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
