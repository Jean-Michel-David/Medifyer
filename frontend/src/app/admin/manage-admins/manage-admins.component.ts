import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AdminManageUserAndRechercheService } from 'src/app/services/admin-manage-users-and-recherche.service';
import { HttpResponse } from '@angular/common/http';

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
  charging = false;
  errorMessage = "";

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

  /**
   * This function selects a user for managing
   * @param userID The id of the selected user
   */
  manageUser(userID : number) {
    this.selectedUser =  this.userList.find((user) => user.id == userID);
    
    if (typeof this.selectedUser != 'undefined') {
      this.showUserList = false;
    }
  }
  
  /**
   * This function sets the admin status of a user
   * @param status the new status of the user
   */
  setAdminStatus(status : boolean) {
    if (typeof this.selectedUser != 'undefined') {
      this.charging = true;
      this.selectedUser.isAdmin = status;
      
      let sub = this.adminService.setAdminStatus(this.selectedUser).subscribe((response) => {
        if(! response.success)
          this.selectedUser!.isAdmin = ! status;

        this.errorMessage = response.message;
        this.charging = false;
        sub.unsubscribe();
      });
    }
  }

    /**
   * This function returns to the selection of the user
   */
    retour() : void {
      this.errorMessage = "";
      this.charging = false;
      this.showUserList = true;
    }
}
