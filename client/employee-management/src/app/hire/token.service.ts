import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders} from '@angular/common/http'

import { Observable } from 'rxjs';

import { Token } from './token';
import { Constant } from '../constant/constant';

//service to get the token from back-end



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
}
@Injectable({
  providedIn: 'root'
})
export class TokenService {

  url = Constant.TOKEN_URL;

  constructor(
    private http: HttpClient,
  ) { }

  // getToken(token:Token): Observable<Token>{
  //   return this.http.
  // }

  requestEmail(email: string): Observable<Token>{
    // console.log("from login.service:" + this.url);
    var tokenWithEmail = new Token(email);
    return this.http.post<Token>(this.url,tokenWithEmail,httpOptions);
  }
}
