import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Observable} from 'rxjs';
import {Letter} from '../letter-form/letter-form.component';
import {map} from 'rxjs/operators';
import {OktaAuthService} from '@okta/okta-angular';

@Component({
  selector: 'app-saved-letters',
  templateUrl: './saved-letters.component.html',
  styleUrls: ['./saved-letters.component.scss']
})
export class SavedLettersComponent implements OnInit {

  items: Observable<Letter[]>;

  constructor(private afs: AngularFirestore, private oktaAuth: OktaAuthService) {
    this.loadLetters();
  }

  async loadLetters() {
    let email = '';
    await this.oktaAuth.getUser().then(data => {
      email = data.email;
    });

    console.log(`email in saved letters: ${email}`);
    this.items = this.afs.collection<Letter>('letters', ref => ref.where('user', '==', email)).snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Letter;
        const id = a.payload.doc.id;
        return {id, ...data};
      })));
    console.log(this.items);
  }

  async getUser() {
    const user = await this.oktaAuth.getUser();
    return user.email;
  }

  ngOnInit(): void {
  }

}
