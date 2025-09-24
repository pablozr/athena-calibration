import { inject, Injectable } from '@angular/core';
import { Localstorage } from '../localstorage/localstorage';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  private localStorage= inject(Localstorage);
  private router = inject(Router);

  isAuthenticated(): boolean {
    const token = this.localStorage.getLocalStorage('token');
    return !!token;
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const isAuthenticated = this.isAuthenticated();

    if ((next.url[0]?.path == 'signin' && isAuthenticated) || (next.url[0]?.path == 'register' && isAuthenticated)) {
      this.router.navigate(['/home']);
      return false
    }

    if (next.url[0]?.path == 'signin' && !isAuthenticated){
      return true
    }

    if (isAuthenticated) {
      return true;
    }

    this.router.navigate(['/signin']);
    return false;
  } 
}
