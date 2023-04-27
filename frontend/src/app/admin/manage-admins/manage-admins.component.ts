import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AdminManageUserAndRechercheService } from 'src/app/services/admin-manage-users-and-recherche.service';

@Component({
  selector: 'app-manage-admins',
  templateUrl: './manage-admins.component.html',
  styleUrls: ['./manage-admins.component.css']
})
export class ManageAdminsComponent implements OnInit{
  showGetMore! : boolean;
  userList! : User[];
  userCount! : number;
  searchString! : string;
  showUserList! : boolean;
  selectedUser! : User | undefined;

  constructor(private adminService : AdminManageUserAndRechercheService) {}

  ngOnInit(): void {
    this.showUserList = true;
    this.showGetMore = true;
    this.selectedUser = undefined;

    //Initial user list to display
    let sub = this.adminService.getUserList(0).subscribe((users) => {
      this.userList = users;
      sub.unsubscribe();
    });
    this.searchString = "";
  }

  /**
   * Narrows the user list using a string
   * @param search String to narrow the selection
   */
  searchUser(search : string) : void {
    this.showGetMore = true;
    this.userCount = 0;
    this.searchString = search;

    let sub = this.adminService.getUserList(this.userCount, this.searchString).subscribe((users) => {
      this.userList = users;
      sub.unsubscribe();
    });
  }

  getMoreUsers($event : number) : void {
    let oldCount = $event;

    let sub = this.adminService.getUserList($event, this.searchString).subscribe((users) => {
      this.userList = [...this.userList, ...users];
      if (oldCount == this.userList.length)
        this.showGetMore = false;
      
      sub.unsubscribe();
    });    
  }

  manageUser(userID : number) {
    this.selectedUser =  this.userList.find((user) => user.id == userID);
    
    if (typeof this.selectedUser != 'undefined') {
      this.showUserList = false;
    }
  }
  
  setAdminStatus(status : boolean) {
    if (typeof this.selectedUser != 'undefined') {
      this.selectedUser.isAdmin = status;
      let sub = this.adminService.setAdminStatus(this.selectedUser).subscribe((response) => {
        
        sub.unsubscribe();
      });
    }
  }
}
