import { inject, Injectable } from '@angular/core';
import { Localstorage } from '../localstorage/localstorage';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { IAuthToken } from '../../interfaces/IAuth';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private localStorage= inject(Localstorage);
  private router = inject(Router);

  getDecodedToken(): IAuthToken{
    const token = this.localStorage.getLocalStorage('USER-INFO')?.acessToken;
    if (!token) {
      throw new Error('No token found');
    }
    return jwtDecode<IAuthToken>(token);
  }

  hasRole(): boolean {
    const token = this.localStorage.getLocalStorage('USER-INFO')?.acessToken;
    if (!token) {
      return false;
    }

    const decodedToken = this.getDecodedToken();
    return decodedToken.roles.includes('ADMIN_ROLE');
  }

  isAuthenticated(): boolean {
    const token = this.localStorage.getLocalStorage('USER-INFO')?.acessToken;
    if (!token) {
      return false;
    }

    try{
      const decodedToken = this.getDecodedToken();
      const currentTime = Math.floor(Date.now() / 1000);
      return decodedToken.exp > currentTime;
    } catch (error) {
      return false;
    }
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.isAuthenticated();

    if ((next.url[0]?.path == 'signin' && isAuthenticated) || (next.url[0]?.path == 'register' && isAuthenticated)) {
      this.router.navigate(['/home']);
      return false
    }

    if ((next.url[0]?.path == 'signin' || next.url[0]?.path == 'register') && !isAuthenticated){
      return true
    }

    if((next.url[0]?.path == 'admin') && !this.hasRole()){
      this.router.navigate(['/home']);
      return false;
    }

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  } 
}
