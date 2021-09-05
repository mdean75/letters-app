import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';



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

  items: Observable<any[]>;

  constructor(private afs: AngularFirestore) {
    this.items = afs.collection('letters').valueChanges();
  }

  ngOnInit(): void {
  }

  async sendMessage() {
    this.isSending = true;
    await delay(3000);
    this.isSending = false;
    this.message = '';
    this.to = '';
    this.from = '';
  }

  saveMessage() {
    const letterCollection = this.afs.collection<Letter>('letters');
    letterCollection.add({to: this.to, from: this.from, message: this.message, createdTs: Date.now()});
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
