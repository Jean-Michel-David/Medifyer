import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../user';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit{
  @Input() userList! : Observable<User[]>;
  @Output() fetchUserQuestions : EventEmitter<number> = new EventEmitter();
  
  @Input() page! : number;
  @Output() changePage : EventEmitter<number> = new EventEmitter();

  ngOnInit() : void {

  }
  onGetUserSearches(event : any, user : number | undefined) : void{
    this.fetchUserQuestions.emit(user);
  }

  onPreviousPage() {
    this.page--;
  }

  onNextPage() {
    this.page++;
  }
}
