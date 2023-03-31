import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Question } from '../recherche/question';

@Injectable({
  providedIn: 'root'
})
export class UserRechercheService {

  private backendUrl = "http://localhost/Medifyer/backend/userRecherche.php";
  constructor(private http : HttpClient) { }

  sauvegarder(question: Question):Observable<any>{
    return this.http.post(this.backendUrl,question);
  }
}

