import {Injector, NgModule} from '@angular/core';
import {Routes, RouterModule, Router} from '@angular/router';
import {LetterFormComponent} from './components/letter-form/letter-form.component';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {SavedLettersComponent} from './components/saved-letters/saved-letters.component';
import {OktaAuthGuard, OktaAuthModule, OktaCallbackComponent, OKTA_CONFIG, OktaAuthService} from '@okta/okta-angular';
import {LoginComponent} from './components/login/login.component';
import {BrowserModule} from '@angular/platform-browser';

export function onAuthRequired(oktaAuth: OktaAuthService, injector: Injector) {
  const router = injector.get(Router);

  // Redirect the user to your custom login page
  router.navigate(['/login']);
}

const routes: Routes = [
  {path: '', component: LetterFormComponent},
  {path: 'letters', component: LetterFormComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: 'savedletters', component: SavedLettersComponent, canActivate: [OktaAuthGuard]},
  {path: 'login/callback', component: OktaCallbackComponent},
  {path: 'login', component: LoginComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  declarations: [

  ],
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true,
  }),
  BrowserModule,
  OktaAuthModule],

  exports: [RouterModule]
})
export class AppRoutingModule { }
