import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, CheckboxRequiredValidator, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { CustomValidators } from './CustomValidators';
import { User } from './userInscription';
import { animate, style, transition, trigger } from '@angular/animations';
import { Message } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1})),
      ])
    ])
  ]
})

export class InscriptionComponent implements OnInit{

  newUser: User ={
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    pwd: '',
    cpwd: '',
    photo: ''
  };



  @Input()
  inscriptionForm: FormGroup = new FormGroup({
    lastname: new FormControl(''),
    firstname: new FormControl(''),
    email: new FormControl(''),
    pwd: new FormControl(''),
    cpwd: new FormControl(''),
    check: new FormControl('')
  });

  submitted = false;

  constructor(
    private api: UserService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    console.log(document.getElementById("check"));
    this.inscriptionForm = this.fb.group({
      lastname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.pattern(/\w+@helha\.be$|^la[0-9]{6}@student\.helha\.be$/i)]],
      pwd: ['', [Validators.required, Validators.minLength(9)]],
      cpwd: ['',[ Validators.required, Validators.minLength(9)]],
      check: ['', CheckboxRequiredValidator]
    },
    {
      validators: [CustomValidators.passwordsMatching('pwd', 'cpwd')]
    }
    );
  }

  get f(): {[Key: string]: AbstractControl} {
    return this.inscriptionForm.controls;
  }

  register() {
    this.newUser.lastname = this.inscriptionForm.controls['lastname'].value;
    this.newUser.firstname = this.inscriptionForm.controls['firstname'].value;
    this.newUser.email = this.inscriptionForm.controls['email'].value;
    this.newUser.pwd = this.inscriptionForm.controls['pwd'].value;
  }

  addNewUser() {
      this.submitted = false;
      this.register();
      if(!this.inscriptionForm.valid){
        alert("Le formulaire est invalide.");
      } else {
      const sub = this.api.addUser(this.newUser).subscribe(() => {
        this.router.navigate(['verif-email']);
        sub.unsubscribe();
      }, (error) => {
        alert(error.error);
        console.log(error.error);
      });
      }
  }

  onSubmit() {
    this.submitted = true;
  }

}

