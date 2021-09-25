import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {Letter, LetterService} from '../../services/letter/letter.service';

@Component({
  selector: 'app-saved-letters',
  templateUrl: './saved-letters.component.html',
  styleUrls: ['./saved-letters.component.scss']
})
export class SavedLettersComponent implements OnInit {

  items: Observable<Letter[]>;
  letters: Observable<Letter[]>;

  constructor(private oktaAuth: OktaAuthService, private letterService: LetterService) {
    this.loadLetters();
  }

  async loadLetters() {
    let email = '';
    await this.oktaAuth.getUser().then(data => {
      email = data.email;
    });

    console.log(`email in saved letters: ${email}`);
    this.items = this.letterService.getUsersLetters(email);
    console.log(this.items);
    this.letters = this.letterService.getMetaForUser(email);
  }

  async getUser() {
    const user = await this.oktaAuth.getUser();
    return user.email;
  }

  ngOnInit(): void {
  }

}
