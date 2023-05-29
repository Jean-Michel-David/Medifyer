import { Component, OnInit } from '@angular/core';
import { User } from '../../inscription/userInscription';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecupPasswordService } from 'src/app/services/recup-password.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../inscription/CustomValidators';

@Component({
  selector: 'app-new-password',
  templateUrl: './new-password.component.html',
  styleUrls: ['./new-password.component.css']
})
export class NewPasswordComponent implements OnInit{
  user: User = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    pwd: '',
    cpwd: ''
  };

  submitted = false;

  newPasswordForm: FormGroup = new FormGroup({
    pwd: new FormControl(),
    cpwd: new FormControl()
  });

  constructor(
    private api: RecupPasswordService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.newPasswordForm = this.fb.group({
      pwd: ['', [Validators.minLength(9)]],
      cpwd: ['', [Validators.minLength(9)]]
    }, {
      validators: [CustomValidators.passwordsMatching('pwd', 'cpwd')]
    }
    );
  }

  get f(): {[key: string]: AbstractControl} {
    return this.newPasswordForm.controls;
  }

  setNewPassword() {
    this.user.email = this.api.email;
    this.user.pwd = this.newPasswordForm.value.pwd;
  }

  modifyPassword() {
    this.submitted = false;
    this.setNewPassword();
    const sub = this.api.modifyPassword(this.user).subscribe(() => {
      alert('Modification réalisée avec succès');
      this.router.navigate(['connexion']);
      sub.unsubscribe();
    }
    );
  }

  onSubmit() {
    this.submitted = true;
  }
}
