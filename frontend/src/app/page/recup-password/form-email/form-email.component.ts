import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailSenderService } from 'src/app/services/email-sender.service';
import { RecupPasswordService } from 'src/app/services/recup-password.service';

@Component({
  selector: 'app-form-email',
  templateUrl: './form-email.component.html',
  styleUrls: ['./form-email.component.css']
})
export class FormEmailComponent implements OnInit{
  
  submitted = false;
  email = "";

  @Input()
  emailForm: FormGroup = new FormGroup({
    email: new FormControl()
  });

  constructor(
    private api: RecupPasswordService,
    private fb: FormBuilder,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    this.emailForm = this.fb.group({
      email: ['',[Validators.required, Validators.pattern(/^la[0-9]{6}@student\.helha\.be$/i)]]
    });
  }

  get f() : {[Key: string]: AbstractControl} {
    return this.emailForm.controls;
  }

  send() {
    this.submitted = false;
    this.email = this.emailForm.controls['email'].value
    RecupPasswordService.userMail = this.email;
    const sub = this.api.sendEmail(this.email).subscribe(
      (response)=>{
        console.log(response)
        if (response.success) {
          alert(response.message);
          this.router.navigate(['password-code']);
        } else {
          alert(response.message)
        }
        sub.unsubscribe();
      }
    )
  }

  onSubmit() {
    this.submitted = true;
  }

}
