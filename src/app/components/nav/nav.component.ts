import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import {OktaAuthService} from '@okta/okta-angular';
import {ActivatedRoute, Router, NavigationEnd} from '@angular/router';
import {UserService} from '../../services/user/user.service';
import { url } from 'inspector';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() isAuthenticated = false;
  @Output() isAuthenticatedChange = new EventEmitter();

  @Input() currentRoute: string;
  @Output() curretRouteEvent = new EventEmitter();

  @Input() email: string;

  @Input() username: string;
  @Output() usernameChange = new EventEmitter();

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XSmall)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, public oktaAuth: OktaAuthService, private router: Router,
              private userservice: UserService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Get the authentication state for immediate use
    // this.isAuthenticated = await this.oktaAuth.isAuthenticated();
    this.currentRoute = this.router.url;
    this.router.events.subscribe(
      (event: any) => {
        if (event instanceof NavigationEnd) {
          this.currentRoute = this.router.url;
          this.curretRouteEvent.emit(this.router.url);
        }
      }
    );

    // url.subscribe(url => console.log(url));
  }

  async logout() {
    // Terminates the session with Okta and removes current tokens.
    await this.oktaAuth.tokenManager.clear();
    this.isAuthenticated = false;

    // use the user service to set and notify components in router-outlet that the user is no longer logged in
    this.userservice.loggedIn.next(false);

    await this.isAuthenticatedChange.emit(this.isAuthenticated);
    await this.router.navigateByUrl('/');
  }

  // todo: not sure this is needed
  async getUser(): Promise<any> {
    const user = await this.oktaAuth.getUser();
    // let username: string;
    console.log(user.name);
    return user;
  }

  async onOutletLoaded(component) {
    component.isAuthenticated = this.oktaAuth.$authenticationState;
  }
}
