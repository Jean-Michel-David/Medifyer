import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AdminGetRechercheService } from 'src/app/services/admin-get-recherche.service';
import { User } from 'src/app/admin/user';

@Component({
  selector: 'app-panneau-admin',
  templateUrl: './panneau-admin.component.html',
  styleUrls: ['./panneau-admin.component.css']
})
export class PanneauAdminComponent implements OnInit, OnDestroy{
  userList! : Observable<User[]>;
  subscription! : Subscription;

  constructor(private service : AdminGetRechercheService) {}
  ngOnDestroy(): void {
    
  }
  ngOnInit(): void {
    //Initial user list to display
    this.userList = this.service.getUserList();
  }

  searchUser(search : string) : void {
    this.userList = this.service.getUserList(1, search);
  }
}
