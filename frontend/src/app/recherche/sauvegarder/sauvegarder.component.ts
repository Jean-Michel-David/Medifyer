import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserRechercheService } from 'src/app/services/user-recherche.service';
import { Equation } from '../equation';
import { Operateurs } from '../operateurs';
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

  isPopupVisible = false;

  sauvegarder(question: Question) {
    const sub = this.api.sauvegarder(question).subscribe((reponse) => {
      if (reponse != null || reponse != undefined) {
        this.showPopup();
      }
      this.newQuestion.emit(reponse);
      sub.unsubscribe();
    });
  }

  showPopup() {
    this.isPopupVisible = true;
    setTimeout(() => {
      this.hidePopup();
    }, 3000);
  }

  hidePopup() {
    this.isPopupVisible = false;
  }

}
