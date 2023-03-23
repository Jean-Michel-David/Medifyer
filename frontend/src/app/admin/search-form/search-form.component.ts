import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  wantedUser! : string;
  @Output() searchUser : EventEmitter<string> = new EventEmitter();

  ngOnInit() : void {
    this.wantedUser = "";
  }

  onSearchUser() : void {
    console.log("searching for : " + this.wantedUser);
    this.searchUser.emit(this.wantedUser);
  }
}
