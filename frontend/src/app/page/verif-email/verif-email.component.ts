import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmailSenderService } from 'src/app/services/email-sender.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent implements OnInit {
 
  submitted = false;
  verifCode = "";

  verifForm: FormGroup = new FormGroup({
    verifCode: new FormControl()
  })

  constructor(
    private api: EmailSenderService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.verifForm = this.fb.group({
      verifCode: ['', [Validators.required]]
    })
  }

  verifyCode() {
    this.submitted = false;
    this.verifCode = this.verifForm.controls['verifCode'].value;
    const sub = this.api.checkCode(this.verifCode).subscribe(
      (response) => {
        if (response.success) {
          alert(response.message);
          this.router.navigate(['index']);
        } else {
          alert(response.message);
        }
        sub.unsubscribe();
      }
    );
  }

  sendEmail() {
    const sub = this.api.sendEmail().subscribe(
      (response) => {
        if (response.success) {
          alert(response.message);
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
