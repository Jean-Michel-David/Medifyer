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

  sauvegarder(question: Question):Observable<Question>{
    return this.http.post<Question>(this.backendUrl,question);
  }

  afficher():Observable<QuestionShort[]>{
    return this.http.get<QuestionShort[]>(this.backendUrl)
  }
}
