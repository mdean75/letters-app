import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';

export interface Letter {
  to: string;
  from: string;
  title: string;
  // message: string;
  user?: string;
  createdTs: any;
  id?: string;
}

export interface InsertResponse {
  id: string;
}

export interface EncodedLetter {
  content: string;
  createdTs: string;
  to: string;
  from: string;
  user: string;
  title: string;
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

  // public saveLetter(letter: Letter): Observable<InsertResponse> {
  //   const url = `${environment.letterAPI}/letter`;
  //   return this.http.post<InsertResponse>(url, letter, this.httpOptions);
  // }

  public getUsersLetters(user: string): Observable<Letter[]> {
    return this.http.get<Letter[]>(`${environment.letterAPI}/users/${user}/letter`, this.httpOptions);
  }

  public saveEncodedLetter(letter: EncodedLetter): Observable<any> {
    const url = `${environment.letterAPI}/letter`;
    return this.http.post<any>(url, letter, this.httpOptions);
  }

  public getMetaForUser(user: string): Observable<Letter[]> {
    return this.http.get<Letter[]>(`${environment.letterAPI}/users/${user}/metadata`, this.httpOptions);
  }

  public getLetter(id: string): Observable<Letter> {
    return this.http.get<Letter>(`${environment.letterAPI}/letter/${id}/meta`, this.httpOptions);
  }

  public getLetterContent(id: string): Observable<EncodedLetter> {
    return this.http.get<EncodedLetter>(`${environment.letterAPI}/letters/${id}/content`, this.httpOptions);
  }
}

