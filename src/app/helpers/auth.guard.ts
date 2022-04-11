import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthStateService } from '../services/auth-state.service';
import { AuthenService } from '../services/authen.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authState: AuthStateService,
    private authenService: AuthenService
  ) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ) {
    const currentUser = this.authState.user;
    if (currentUser && currentUser.role == 'admin') {
      if (currentUser.token && !this.tokenExpired(currentUser.token)) {
        return true;
      }
      if (!this.refreshToken(currentUser?.token || '', currentUser?.refreshToken || '')) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
        return false;
      }
      return true;
    }
    else if (currentUser && currentUser.role == 'customer') {
      if (currentUser.token && !this.tokenExpired(currentUser.token)) {
        this.router.navigate(['/items']);
        return true;
      }
      if (!this.refreshToken(currentUser?.token || '', currentUser?.refreshToken || '')) {
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url} });
        return false;
      }
      return true;
    }

    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  private tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }
  private async refreshToken(token: string, refreshToken: string):Promise<boolean>{
    try{
      await this.authenService.refreshToken(token, refreshToken).toPromise();
      return true;
    }
    catch(err){
      return false;
    }
  }
}
