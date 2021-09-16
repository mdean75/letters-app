import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface Letter {
  to: string;
  from: string;
  message: string;
  user?: string;
  createdTs: any;
  id?: string;
}

export interface InsertResponse {
  id: string;
}

@Injectable({
  providedIn: 'root'
})
export class LetterService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  public saveLetter(letter: Letter): Observable<InsertResponse> {
    const url = `${environment.letterAPI}/letter`;
    return this.http.post<InsertResponse>(url, letter, this.httpOptions);
  }

  public getUsersLetters(user: string): Observable<Letter[]> {
    return this.http.get<Letter[]>(`${environment.letterAPI}/users/${user}/letter`, this.httpOptions);
  }
}

