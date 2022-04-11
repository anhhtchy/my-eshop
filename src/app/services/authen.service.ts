import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthStateService } from './auth-state.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor(
    public authState: AuthStateService,
    private http: HttpClient
  ) { }

  login(username: string, password: string) {
    return this.http.post<User>(`${environment.apiUrl}/users/authenticate`, {username, password})
      .pipe(map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.authState.user = user;
        return user;
      }));
  }

  logout(refreshToken: string) {
    this.http.post<any>(`${environment.apiUrl}/users/revoke`, {refreshToken})
      .subscribe();
        
    sessionStorage.removeItem('user');
    this.authState.user = null;
  }
  refreshToken(token: string, refreshToken: string){
    return this.http.post<User>(`${environment.apiUrl}/users/refresh`, {token, refreshToken})
    .pipe(
      map(user => {
        sessionStorage.setItem('user', JSON.stringify(user));
        this.authState.user = user;
        return user;
      })
    );
  }
}
