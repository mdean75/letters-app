import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LetterFormComponent} from './components/letter-form/letter-form.component';
import {AppComponent} from './app.component';
import {AboutMeComponent} from './components/about-me/about-me.component';


const routes: Routes = [
  {path: '', component: LetterFormComponent},
  {path: 'letters', component: LetterFormComponent},
  {path: 'aboutme', component: AboutMeComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload',
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
