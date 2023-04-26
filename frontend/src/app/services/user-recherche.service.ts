import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../recherche/question';
import { QuestionShort } from '../recherche/question-short';

@Injectable({
  providedIn: 'root'
})
export class UserRechercheService {

  private backendUrl = "http://localhost/Medifyer/backend/question/userRecherche.php";
  constructor(private http : HttpClient) { }
/**
   * This function save a function into the db
   * @param question The question that will be saved
   * @returns The question saved with its new informations (id, etc)
   */
  sauvegarder(question: Question):Observable<Question>{
    return this.http.post<Question>(this.backendUrl,question);
  }
/**
   * This function fetches the searches of the current user
   * @returns The list of short questions (only ID and question) - all the questions of the current user
   */
  afficher():Observable<QuestionShort[]>{
    return this.http.get<QuestionShort[]>(this.backendUrl)
  }
/**
   * This function fetches the searches of selected user
   * @param id the id of the question selected
   * @returns The question selected for developpement
   */
  developper(id : Number):Observable<Question>{
    return this.http.get<Question>(this.backendUrl + "?id=" + id);
  }

/**
   * This function delete a question
   * @param id the id of the question to delete
   * @returns The question selected for developpement
   */
  supprimer(id : number): Observable<Boolean>{
    return this.http.delete<Boolean>(this.backendUrl + "?id=" + id);
  }
}
