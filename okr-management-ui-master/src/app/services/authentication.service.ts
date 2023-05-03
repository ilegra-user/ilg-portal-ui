import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  isLoggedIn: boolean = false;
  rememberMe: boolean = false;

  constructor(private http: HttpClient) {
    this.rememberMe = localStorage.getItem(environment.localStorageKey) != null;

    if (this.rememberMe) {
      this.isLoggedIn = true;
      this.currentUserSubject = new BehaviorSubject<User>(
        JSON.parse(localStorage.getItem(environment.localStorageKey) || '{}')
      );
      this.currentUser = this.currentUserSubject.asObservable();
    } else {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse('{}'));
      this.currentUser = this.currentUserSubject.asObservable();
    }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string, rememberMe: boolean) {
    return this.http
      .post<any>(`${environment.apiUrl}/auth`, { username, password })
      .pipe(
        map((data) => {
          var user = new User();

          if (data.token != '') {
            user.token = data.token;
            if (rememberMe) {
              this.resetCredentials();

              localStorage.setItem(
                environment.localStorageKey,
                JSON.stringify(user)
              );
            } else {
              sessionStorage.setItem(
                environment.localStorageKey,
                JSON.stringify(user)
              );
            }
            this.currentUserSubject.next(user);
            return user;
          }

          return null;
        })
      );
  }

  resetCredentials() {
    localStorage.removeItem(environment.localStorageKey);
    sessionStorage.removeItem(environment.localStorageKey);
    this.currentUserSubject.next(new User());
  }

  logout() {
    localStorage.removeItem(environment.localStorageKey);
    this.currentUserSubject.next(JSON.parse('{}'));
  }
}
