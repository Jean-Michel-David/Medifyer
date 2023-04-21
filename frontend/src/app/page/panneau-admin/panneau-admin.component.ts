import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-panneau-admin',
  templateUrl: './panneau-admin.component.html',
  styleUrls: ['./panneau-admin.component.css']
})
export class PanneauAdminComponent{
  constructor(private rooter : Router) {}
  
  onSearchUser() : void {
    this.rooter.navigate(['admin-find-user-search']);
  }
}
