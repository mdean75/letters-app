export const environment = {
  production: true,
  letterAPI: 'https://api.letters2lostlovedones.com',
  okta: {
    oidc: {
      clientId: `0oa1o7lwagrUdSmCg5d7`,
      issuer: `https://dev-07780239.okta.com/oauth2/default`,
      redirectUri: 'https://letters2lostlovedones.com/login/callback',
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
