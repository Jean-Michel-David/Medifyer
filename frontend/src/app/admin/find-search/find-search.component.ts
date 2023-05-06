import { Component } from '@angular/core';
import { User } from '../user';
import { QuestionShort } from 'src/app/recherche/question-short';
import { AdminManageUserAndRechercheService } from 'src/app/services/admin-manage-users-and-recherche.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-find-search',
  templateUrl: './find-search.component.html',
  styleUrls: ['./find-search.component.css']
})
export class FindSearchComponent {
  userList! : User[];
  userSearches! : Observable<QuestionShort[]>;
  userSharedSearches! : Observable<QuestionShort[]>;

  showUserList : boolean = true;
  userCount = 0;

  searchString! : string;
  showGetMore! : boolean;

  constructor(private service : AdminManageUserAndRechercheService) {}
  ngOnInit(): void {
    this.showGetMore = true;

    //Initial user list to display
    let sub = this.service.getUserList(0).subscribe((users) => {
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

    let sub = this.service.getUserList(this.userCount, this.searchString).subscribe((users) => {
      this.userList = users;
      sub.unsubscribe();
    });
  }

  /**
   * Fetches all the search questions of the selected user
   * @param user Selected user
   */
  fetchQuestions(user : number) : void{
    this.showUserList = false;
    console.log('fetching questions for user with ID : ' + user);
    this.userSearches = this.service.getUserSearches(user);
    this.userSharedSearches = this.service.getUserSharedSearches(user);
  }

  /**
   * This function changes the page for the users browsing
   * @param $event the number of already fetched users
   * @TODO : Modify the page system so it's nice looking, and in a style like "1 ... 4 <5> 6 ... 8"
   */
  getMoreUsers($event : number) : void {
    let oldCount = $event;

    let sub = this.service.getUserList($event, this.searchString).subscribe((users) => {
      this.userList = [...this.userList, ...users];
      if (oldCount == this.userList.length)
        this.showGetMore = false;

      sub.unsubscribe();
    });
  }

  /**
   * This function returns to the selection of the user
   */
  retour() : void {
    this.showUserList = true;
  }
}
