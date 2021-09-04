import { Component, OnInit } from '@angular/core';

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

  constructor() { }

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
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
