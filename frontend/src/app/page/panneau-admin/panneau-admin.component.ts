import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminGetRechercheService } from 'src/app/services/admin-get-recherche.service';
import { User } from 'src/app/user';

@Component({
  selector: 'app-panneau-admin',
  templateUrl: './panneau-admin.component.html',
  styleUrls: ['./panneau-admin.component.css']
})
export class PanneauAdminComponent implements OnInit{
  userList! : Observable<User[]>;
  constructor(private service : AdminGetRechercheService) {}

  ngOnInit(): void {
    this.userList = this.service.getUserList();
  }
}
