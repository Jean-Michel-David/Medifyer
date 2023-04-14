import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from '../inscription/userInscription';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.css']
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
      email: ['', [Validators.required, Validators.pattern(/la[0-9]{6}@student\.helha\.be/)]],
      pwd: ['', [Validators.required, Validators.minLength(9)]]
    });
  }

  get f() : {[Key: string]: AbstractControl} {
    return this.loginForm.controls;
  }

  login(){

  }

  onSubmit(){
    this.submitted = true;

  }
}
