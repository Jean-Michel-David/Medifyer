import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionShort } from '../recherche/question-short';
import { User } from '../admin/user';

@Injectable({
  providedIn: 'root'
})
export class AdminGetRechercheService {
  private backendUrl = "http://localhost/Medifyer/backend/admin/admin.php";

  constructor(private http : HttpClient) {}

  /** This function fetches a list of users for the admin.
   *  @param userCount The userCount (first userCount of users, second userCount of users,...)
   * @param search The string used to narrow the list (typically name or matricule)
   * @returns The list of users
   */
  getUserList(userCount : number, search? : string) : Observable<User[]>{
    // TODO : add security token or something
    // TODO : remove any '&' from the search string
    console.log('Requesting user list');

    // Initial list / list with empty search string
    if (typeof(search) === "undefined")
      return this.http.get<User[]>(this.backendUrl + "?getUserList=&userCount=" + userCount);

    // List when searching for a name / matricule
    return this.http.get<User[]>(this.backendUrl + "?getUserList=" + search +
    "&userCount=" + (typeof(userCount) === undefined ? 1 : userCount));
  }

  /**
   * This function fetches the results of
   * @param user The ID of the selected user
   * @returns The list of short questions (only ID and question) - all the questions of the selected user
   */
  getUserSearches(user : number) : Observable<QuestionShort[]>{
    return this.http.get<QuestionShort[]>(this.backendUrl + '?getUserSearches=' + user);
  }
}
