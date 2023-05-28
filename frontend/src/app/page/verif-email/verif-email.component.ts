import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailSenderService } from 'src/app/email-sender.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent implements OnInit {
 
  submitted = false;
  isEmailSent = false;

  verifForm: FormGroup = new FormGroup({
    verifCode: new FormControl()
  })

  constructor(
    private api: EmailSenderService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.verifForm = this.fb.group({
      verifCode: ['', [Validators.required]]
    })
    this.sendEmail();
  }

  sendEmail() {
    const sub = this.api.sendVerificationEmail().subscribe( () => {
      sub.unsubscribe();
    }
    )
  }

  verifyCode() {

  }
}
