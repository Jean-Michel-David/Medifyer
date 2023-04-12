import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminGetRechercheService } from 'src/app/services/admin-get-recherche.service';
import { User } from 'src/app/admin/user';
import { QuestionShort } from 'src/app/recherche/question-short';

@Component({
  selector: 'app-panneau-admin',
  templateUrl: './panneau-admin.component.html',
  styleUrls: ['./panneau-admin.component.css']
})
export class PanneauAdminComponent implements OnInit{
  userList! : Observable<User[]>;
  userSearches! : Observable<QuestionShort[]>;
  showUserList : boolean = true;
  page : number = 1;

  constructor(private service : AdminGetRechercheService) {}
  ngOnInit(): void {
    //Initial user list to display
    this.userList = this.service.getUserList(1);
  }

  /**
   * Narrows the user list using a string
   * @param search String to narrow the selection
   */
  searchUser(search : string) : void {
    this.userList = this.service.getUserList(this.page, search);
    this.page = 1;
  }

  /**
   * Fetches all the search questions of the selected user
   * @param user Selected user
   */
  fetchQuestions(user : number) : void{
    this.showUserList = false;
    console.log('fetching questions for user with ID : ' + user);
    this.userSearches = this.service.getUserSearches(user);
  }

  /**
   * This function changes the page for the users browsing
   * @param $page the new page
   * @TODO : Modify the page system so it's nice looking, and in a style like "1 ... 4 <5> 6 ... 8"
   */
  changePage($page : number) : void {

  }

  /**
   * This function returns to the selection of the user
   */
  retour() : void {
    this.showUserList = true;
  }
}
