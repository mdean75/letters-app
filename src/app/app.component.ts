import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'letters-app';
  items: Observable<any[]>;
  isAuthenticated = false;
  username: string;

  constructor(public oktaAuth: OktaAuthService, public router: Router) {
    this.oktaAuth.$authenticationState.subscribe(
      async (isAuthenticated: boolean) => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  async getUser(): Promise<string> {
    const user = await this.oktaAuth.getUser();
    return user.name;
  }

  async ngOnInit() {
    // Get the authentication state for immediate use
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
  }
}
