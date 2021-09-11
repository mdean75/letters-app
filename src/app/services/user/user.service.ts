import { Injectable } from '@angular/core';
import {OktaAuthService} from '@okta/okta-angular';
import {BehaviorSubject, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public loggedIn: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private oktaAuth: OktaAuthService) { }

  getStatus(): Subject<boolean> {
    return this.loggedIn;
  }


}
