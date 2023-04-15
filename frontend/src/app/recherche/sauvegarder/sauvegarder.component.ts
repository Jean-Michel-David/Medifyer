import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { Question } from '../question';

@Component({
  selector: 'app-sauvegarder',
  templateUrl: './sauvegarder.component.html',
  styleUrls: ['./sauvegarder.component.css']
})
export class SauvegarderComponent {
  @Input()
  question! : Question;
  @Output()
  newQuestion = new EventEmitter<Question>;

  constructor(private api: UserRechercheService) {}

  sauvegarder(question : Question){
    const sub = this.api.sauvegarder(question).subscribe((reponse) => {
      this.newQuestion.emit(reponse);
       //if reponse != null then store data into a var and show a pop up success
      sub.unsubscribe();
    });
  }
}
