// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAEPlF_1JqEzEJlvUWKL90LEbEJqufsEdM',
    authDomain: 'astute-heaven-134402.firebaseapp.com',
    databaseURL: 'https://astute-heaven-134402.firebaseio.com',
    projectId: 'astute-heaven-134402',
    storageBucket: 'astute-heaven-134402.appspot.com',
    messagingSenderId: '877187857482',
    appId: '1:877187857482:web:a231b3b874b4c39204bab3',
    measurementId: 'G-9PNWVWLH8K'
  },
  okta: {
    oidc: {
      clientId: `0oa1o7lwagrUdSmCg5d7`,
      issuer: `https://dev-07780239.okta.com/oauth2/default`,
      redirectUri: 'http://localhost:4200/login/callback',
      scopes: ['openid', 'profile', 'email'],
      testing: {
        disableHttpsCheck: `true`
      },
      useInteractionCodeFlow: `false`,
    },
    resourceServer: {
      messagesUrl: 'http://localhost:8000/api/messages',
    },
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
