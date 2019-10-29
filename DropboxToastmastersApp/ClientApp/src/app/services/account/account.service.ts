import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import { CookieService } from 'ngx-cookie-service';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class UserAccount {
  token: string;
  name: string;
  photoUrl: string;
}

export class AccountService {

  AccountUrl = 'api/account/';
  SignInUrl = 'api/account/signin/';
  SessionKey = 'Session';

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  setNewSessionId() {
    this.cookieService.set(this.SessionKey, this.generateUUID())
  }

  generateUUID() { // Public Domain/MIT
    let d = new Date().getTime();// Timestamp
    let d2 = (performance && performance.now && (performance.now() * 1000)) || 0;// Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = Math.random() * 16;// random number between 0 and 16
      if(d > 0){// Use timestamp until depleted
        r = (d + r)%16 | 0;
        d = Math.floor(d/16);
      } else {// Use microseconds since page-load if supported
        r = (d2 + r)%16 | 0;
        d2 = Math.floor(d2/16);
      }
      return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
  }

  getCurrentSessionId() {
    if (this.cookieService.check(this.SessionKey)) {
      return this.cookieService.get(this.SessionKey)
    } else {
      return null;
    }
  }

  getAccountResponse(): Observable<HttpResponse<UserAccount>> {
    const session = this.getCurrentSessionId();
    if (session != null) {
      return this.http.get<UserAccount>(
        this.AccountUrl + session, {observe: "response"}
      );
    } else {
      throw 'Session Do Not Exists'
    }
  }

  signIn(): Observable<HttpResponse<string>> {
    this.setNewSessionId();
    const session = this.getCurrentSessionId();
    return  this.http.get(
      this.SignInUrl + session,
      {observe: "response", responseType: "text"}
      );
  }
}
