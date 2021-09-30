import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  name: string;
  email: string;
  message: string;

  constructor() { }

  ngOnInit(): void {
  }

  submitForm() {
    console.log('clicked submit');
    console.log(`name: ${this.name}, email: ${this.email}, message: ${this.message}`);
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
