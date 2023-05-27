import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmailSenderService } from 'src/app/email-sender.service';

@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
})
export class VerifEmailComponent implements OnInit {
 
  submitted = false

  verifForm: FormGroup = new FormGroup({
    verifCode: new FormControl()
  })

  constructor(
    private api: EmailSenderService
  ) {}

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  verifyCode() {

  }
}
