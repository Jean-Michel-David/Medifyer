import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {
  // TODO : change the divs and put a form instead in the html so when enter pressed, form is submitted
  wantedUser! : string;
  @Output() searchUser : EventEmitter<string> = new EventEmitter();

  ngOnInit() : void {
    this.wantedUser = "";
  }

  onSearchUser() : void {
    this.searchUser.emit(this.wantedUser);
  }
}
