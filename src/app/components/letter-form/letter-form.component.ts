import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {UserService} from '../../services/user/user.service';
import {Letter, LetterService} from '../../services/letter/letter.service';

@Component({
  selector: 'app-letter-form',
  templateUrl: './letter-form.component.html',
  styleUrls: ['./letter-form.component.scss']
})

export class LetterFormComponent implements OnInit {
  isSending = false;
  message = '';
  to = '';
  from = '';

  @Input() username: string;
  @Input() email: string;
  @Input() isAuthenticated: boolean;

  items: Observable<any[]>;

  constructor(private oktaAuth: OktaAuthService, private userservice: UserService,
              private letterService: LetterService) {

    // listen for changes to the user's logged in status
    this.userservice.loggedIn.subscribe(status => this.isAuthenticated = status);
    console.log(this.oktaAuth.getUser().then(data => {console.log(data.time_zone); }));
  }

  async ngOnInit() {
    console.log(`email: ${this.email}`);
  }

  async sendMessage() {
    this.isSending = true;
    await delay(5000);
    this.isSending = false;
    this.message = '';
    this.to = '';
    this.from = '';
  }

  async saveMessage() {
    const user = await this.oktaAuth.getUser();
    const letter: Letter = {to: this.to, from: this.from, message: this.message, createdTs: new Date().toISOString(), user: user.email};
    this.letterService.saveLetter(letter).subscribe(res => {
      console.log(res.id);
    }, error => {
      console.error(error);
    });
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

