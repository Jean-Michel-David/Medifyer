import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../inscription/userInscription';
import { animate, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css'],
  animations: [
    trigger('insertTrigger', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('200ms ease-in-out', style({ opacity: 1})),
      ])
    ])
  ]
})
export class ConnexionComponent {

  loggedUser: User ={
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    pwd: '',
    cpwd: '',
    photo: ''
  }

  @Input()
  loginForm: FormGroup = new FormGroup({
    email: new FormControl(''),
    pwd: new FormControl('')
  });

  submitted = false;

  constructor(
    private api: UserService,
    private router: Router,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(/^la[0-9]{6}@student\.helha\.be$/i)]],
      pwd: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  get f() : {[Key: string]: AbstractControl} {
    return this.loginForm.controls;
  }

  login(){
    this.submitted=false;
    this.loggedUser.email = this.loginForm.controls['email'].value;
    this.loggedUser.pwd = this.loginForm.controls['pwd'].value;
    const sub = this.api.login(this.loggedUser).subscribe(() => {
      this.router.navigate(['index']);
      sub.unsubscribe();
    }, (error) => {
      console.log(error);
    })
  }

  onSubmit(){
    this.submitted = true;
  }
}
