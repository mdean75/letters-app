import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import {OktaAuthService} from '@okta/okta-angular';
import {UserService} from '../../services/user/user.service';

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

  constructor(private afs: AngularFirestore, private oktaAuth: OktaAuthService, private userservice: UserService) {
    this.items = afs.collection('letters').valueChanges();

    // listen for changes to the user's logged in status
    this.userservice.loggedIn.subscribe(status => this.isAuthenticated = status);
  }

  ngOnInit(): void {
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
    const letterCollection = this.afs.collection<Letter>('letters');
    const user = await this.oktaAuth.getUser();
    await letterCollection.add({to: this.to, from: this.from, message: this.message, createdTs: Date.now(), user: user.email});
  }
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export interface Letter {
  to: string;
  from: string;
  message: string;
  user?: string;
  createdTs: any;
  id?: string;
}
