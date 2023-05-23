import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserInfosService } from 'src/app/services/user-infos.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../inscription/userInscription';
import { CustomValidators } from '../inscription/CustomValidators';
import { GestionCompteService } from 'src/app/services/gestion-compte.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent implements OnInit{

  user: User = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    pwd: '',
    cpwd: '',
  }

  @Input()
  monCompteForm: FormGroup = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl(''),
    pwd: new FormControl(''),
    cpwd: new FormControl('')
  });

  constructor(
    private apiAccount: GestionCompteService,
    private apiUser: UserService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
      this.getInfos();
      this.monCompteForm = this.fb.group({
      firstname: [this.user.firstname, [Validators.minLength(2), Validators.maxLength(50)]],
      lastname: [this.user.lastname, [Validators.minLength(2), Validators.maxLength(50)]],
      email: [this.user.email],
      pwd: ['', [Validators.minLength(9)]],
      cpwd: ['', [Validators.minLength(9)]]
    },
    {
      Validators: [CustomValidators.passwordsMatching('pwd', 'cpwd')]
    });
  }

  get f(): {[Key: string]: AbstractControl} {
    return this.monCompteForm.controls;
  }

  getInformation(){

  }

  deleteUser(): void {
    if (confirm("Etes vous certain de vouloir supprimer votre compte? Cette action est irréversible")) {
      let sub = this.apiUser.deleteUser().subscribe(() =>{
        console.log("User delete with succes");
        sub.unsubscribe();
      })
    }
  }

  getInfos(){
    let sub = this.apiAccount.getUserInfos().subscribe(() =>{
      
      sub.unsubscribe();
    })

  }

}
