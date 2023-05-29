import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailSenderService } from 'src/app/services/email-sender.service';

@Component({
  selector: 'app-password-code',
  templateUrl: './password-code.component.html',
  styleUrls: ['./password-code.component.css']
})
export class PasswordCodeComponent implements OnInit {
 
  submitted = false;
  verifCode = "";

  verifPwdForm: FormGroup = new FormGroup({
    verifCode: new FormControl()
  })

  constructor(
    private api: EmailSenderService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifPwdForm = this.fb.group({
      verifCode: ['', [Validators.required]]
    })
  }

  verifyPwdCode() {
    this.submitted = false;
    this.verifCode = this.verifPwdForm.controls['verifCode'].value;
    const sub = this.api.checkCode(this.verifCode).subscribe(
      (response) => {
        if (response.success) {
          alert(response.message);
          localStorage.setItem('pwd-code' ,this.verifCode);
          this.router.navigate(['new-password']);
        } else {
          alert(response.message);
        }
        sub.unsubscribe();
      }
    );
  }

  onSubmit(){
    this.submitted = true;
  }
}
