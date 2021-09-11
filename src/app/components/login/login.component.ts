import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';
// @ts-ignore
import * as OktaSignIn from '@okta/okta-signin-widget';
import {Router} from '@angular/router';
import {environment} from '../../../environments/environment';

const DEFAULT_ORIGINAL_URI = window.location.origin;

let USE_INTERACTION_CODE = false;
if (environment.okta.oidc.useInteractionCodeFlow === 'true') {
  USE_INTERACTION_CODE = true;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit, OnDestroy {
  signIn: any;

  @Input() username: string;
  @Output() usernameChange = new EventEmitter();

  constructor(public oktaAuth: OktaAuthService, router: Router) {
    this.signIn = new OktaSignIn({
      /**
       * Note: when using the Sign-In Widget for an OIDC flow, it still
       * needs to be configured with the base URL for your Okta Org. Here
       * we derive it from the given issuer for convenience.
       */
      baseUrl: environment.okta.oidc.issuer.split('/oauth2')[0],
      clientId: environment.okta.oidc.clientId,
      redirectUri: environment.okta.oidc.redirectUri,
      logo: '/favicon.ico',
      i18n: {
        en: {
          'primaryauth.title': 'Sign in to Angular & Company',
        },
      },
      authParams: {
        issuer: environment.okta.oidc.issuer,
        scopes: environment.okta.oidc.scopes,
      },
      features: {
        registration: true
      },
      useInteractionCodeFlow: USE_INTERACTION_CODE,
    });
  }

  ngOnInit() {
    // When navigating to a protected route, the route path will be saved as the `originalUri`
    // If no `originalUri` has been saved, then redirect back to the app root
    const originalUri = this.oktaAuth.getOriginalUri();
    if (!originalUri || originalUri === DEFAULT_ORIGINAL_URI) {
      this.oktaAuth.setOriginalUri('/');
    }

    this.signIn.showSignInToGetTokens({
      el: '#sign-in-widget',
      scopes: environment.okta.oidc.scopes
    }).then(tokens => {
      // Remove the widget
      this.signIn.remove();

      // In this flow the redirect to Okta occurs in a hidden iframe
      this.oktaAuth.handleLoginRedirect(tokens);
    }).catch(err => {
      // Typically due to misconfiguration
      throw err;
    });
  }

  ngOnDestroy() {
    this.signIn.remove();
  }
}
