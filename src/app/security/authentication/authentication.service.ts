import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly loginPath = environment.path + "users/login";

  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Observable<boolean> {
    const headers: HttpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.loginPath, JSON.stringify({username, password}), {headers}).pipe(map((res: any) => {
        let token = res && res['accessToken'];
        let expiresIn = res && res['expiresIn']
        if (token && expiresIn) {
          sessionStorage.setItem('currentUser', JSON.stringify({
            token: token,
            expiresIn: expiresIn
          }));
          return true;
        } else {
          return false;
        }
      })
    )
  }

  logout() {
    sessionStorage.removeItem('currentUser');
    location.href="/login"
  }

  hasLoggedIn() {
    return !!sessionStorage.getItem('currentUser');
  }
}
