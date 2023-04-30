import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  @Input() userList! : User[];
  @Input() showGetMore! : boolean;

  @Output() selectUser : EventEmitter<number> = new EventEmitter();
  @Output() getMoreUsers : EventEmitter<number> = new EventEmitter();

  ngOnInit() : void {}

  /**
   * this function extracts the searches of a user
   * @param event unused
   * @param user the user from which to extract the searches
   */
  onGetUserSearches(event : any, user : number | undefined) : void{
    this.selectUser.emit(user);
  }

  /**
   * This function fetches more users to display
   */
  onGetNext() {
    this.getMoreUsers.emit(this.userList.length);
  }
}
