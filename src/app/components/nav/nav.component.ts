import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {OktaAuthService} from '@okta/okta-angular';
import {Router} from '@angular/router';
import {UserService} from '../../services/user/user.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  @Input() isAuthenticated = false;
  @Output() isAuthenticatedChange = new EventEmitter();

  @Input() email: string;

  @Input() username: string;
  @Output() usernameChange = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public oktaAuth: OktaAuthService, private router: Router,
              private userservice: UserService) {}

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.tokenManager.clear();
    this.isAuthenticated = false;

    // use the user service to set and notify components in router-outlet that the user is no longer logged in
    this.userservice.loggedIn.next(false);

    await this.isAuthenticatedChange.emit(this.isAuthenticated);
    await this.router.navigateByUrl('/');
  }

  async getUser(): Promise<any> {
    const user = await this.oktaAuth.getUser();
    // let username: string;
    console.log(user.name);
    return user;
  }

  async onOutletLoaded(component) {
    const user = await this.oktaAuth.getUser();
    component.email = user.email;
    component.isAuthenticated = this.oktaAuth.$authenticationState;
  }
}
