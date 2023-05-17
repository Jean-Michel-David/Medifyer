import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfosService } from 'src/app/services/user-infos.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-mon-compte',
  templateUrl: './mon-compte.component.html',
  styleUrls: ['./mon-compte.component.css']
})
export class MonCompteComponent {

  constructor(
    protected apiInfos: UserInfosService,
    protected apiUser: UserService,
    protected router: Router
  ){}

  deleteUser(): void {
    if (confirm("Etes vous certain de vouloir supprimer votre compte? Cette action est irréversible")) {
      const sub = this.apiUser.deleteUser().subscribe(() =>{
        console.log("User delete with succes");
        sub.unsubscribe();
      })
    }
  }

  getInfos() {
    const sub = this.apiInfos.getInfos().subscribe(() =>{
      console.log("Succes");
      sub.unsubscribe();
    })
  }

}
