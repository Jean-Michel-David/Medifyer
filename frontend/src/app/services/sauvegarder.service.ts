import { EventEmitter, Injectable, Output } from '@angular/core';
import { Equation } from '../recherche/equation';
import { Operateurs } from '../recherche/operateurs';
import { Question } from '../recherche/question';
import { UserRechercheService } from './user-recherche.service';

@Injectable({
  providedIn: 'root'
})
export class SauvegarderService {

  constructor(private api: UserRechercheService) {}

  isPopupVisible = false;

  // Retourne une Promise qui résoudra avec la nouvelle question sauvegardée
  sauvegarder(question: Question): Promise<Question> {
    return new Promise((resolve, reject) => {
      const sub = this.api.sauvegarder(question).subscribe((reponse) => {
        sub.unsubscribe();
        resolve(reponse);
      }, (error) => {
        sub.unsubscribe();
        reject(error);
      });
    });
  }
}
/* Code pour formulaires.ts
sauvegarder(){
    this.api.sauvegarder(this.toQuestion()) .then((newQuestion) => {
      console.log(newQuestion);
    })
    .catch((error) => {
      // Gérer l'erreur ici
    });
  }*/
