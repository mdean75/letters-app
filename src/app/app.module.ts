import { BrowserModule } from '@angular/platform-browser';
import {Injector, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LetterFormComponent } from './components/letter-form/letter-form.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {FormsModule} from '@angular/forms';
import { NavComponent } from './components/nav/nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { AboutMeComponent } from './components/about-me/about-me.component';
import { SavedLettersComponent } from './components/saved-letters/saved-letters.component';
import { LoginComponent } from './components/login/login.component';
import {OKTA_CONFIG, OktaAuthGuard, OktaAuthModule, OktaCallbackComponent} from '@okta/okta-angular';
import oktaAuthConfig from './app.config';
import { Router } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
import { NgxSummernoteModule } from 'ngx-summernote';

import * as $ from 'jquery';

const oktaConfig = Object.assign({
  onAuthRequired: (oktaAuth, injector) => {
    const router = injector.get(Router);
    // Redirect the user to your custom login page
    router.navigate(['/login']);
  }
}, oktaAuthConfig.oidc);



@NgModule({
  declarations: [
    AppComponent,
    LetterFormComponent,
    NavComponent,
    AboutMeComponent,
    SavedLettersComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    NgxSummernoteModule,
    MatProgressBarModule
  ],
  providers: [
    {provide: OKTA_CONFIG, useValue: oktaConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
