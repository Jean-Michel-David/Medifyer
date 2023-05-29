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
export class MonCompteComponent implements OnInit {

  user: User = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    pwd: '',
    cpwd: '',
    photo: ''
  };

  submitted = false;

  monCompteForm: FormGroup = new FormGroup({
    firstname: new FormControl(),
    lastname: new FormControl(),
    email: new FormControl(),
    pwd: new FormControl(),
    cpwd: new FormControl()
  });

  constructor(
    private apiAccount: GestionCompteService,
    private apiUser: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.monCompteForm = this.fb.group({
      firstname: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      lastname: ['', [Validators.minLength(2), Validators.maxLength(50)]],
      email: [''],
      pwd: ['', [Validators.minLength(9)]],
      cpwd: ['', [Validators.minLength(9)]]
    }, {
      validators: [CustomValidators.passwordsMatching('pwd', 'cpwd')]
    });
    this.getInfos();
  }

  get f(): { [key: string]: AbstractControl } {
    return this.monCompteForm.controls;
  }

  setNewInfos() {
    this.user.firstname = this.monCompteForm.value.firstname;
    this.user.lastname = this.monCompteForm.value.lastname;
    this.user.email = this.monCompteForm.value.email;
    this.user.pwd = this.monCompteForm.value.pwd;
  }

  sendInfos() {
    this.submitted = false;
    this.setNewInfos();
    const sub = this.apiAccount.sendUserInfos(this.user).subscribe(() => {
      alert('Modification réalisée avec succès');
      sub.unsubscribe();
    });
  }

  deleteUser(): void {
    if (confirm('Êtes-vous certain de vouloir supprimer votre compte? Cette action est irréversible.')) {
      const sub = this.apiUser.deleteUser().subscribe(() => {
        sub.unsubscribe();
      });
    }
    this.router.navigate(['index']);
  }

  getInfos() {
    const sub = this.apiAccount.getUserInfos().subscribe(
      (response: User) => {
        this.user = response;
        this.monCompteForm.patchValue({
          firstname: this.user.firstname,
          lastname: this.user.lastname,
          email: this.user.email
        });
        sub.unsubscribe();
      }
    );
  }
  
  onSubmit() {
    this.submitted = true;
  }
}
