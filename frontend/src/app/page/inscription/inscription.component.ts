import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/userInscription';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-inscription-form',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit{
  newUser: User = {
    id: -1,
    firstname: '',
    lastname: '',
    email: '',
    pwd: '',
    cpwd: '',
    photo: ''
  }

  constructor(
    private api: UserService,
    private router: Router,
  ){}

  ngOnInit(): void {

  }

  addNewUser() {
      const sub = this.api.addUser(this.newUser).subscribe((user) => {
        this.newUser = user;
        this.router.navigate(['home']);
        sub.unsubscribe();
      })
  }
}
