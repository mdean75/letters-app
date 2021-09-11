export const environment = {
  production: true,
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
      scopes: ['openid', 'profile', 'email', 'locale'],
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
