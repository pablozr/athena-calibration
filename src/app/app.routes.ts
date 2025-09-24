import { Routes } from '@angular/router';
import { Auth } from './modules/global/services/auth/auth';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/global/pages/home/home').then((m) => m.Home),
    canActivate:[Auth]
  },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/pages/dashboard/dashboard').then((m) => m.Dashboard),
    canActivate:[Auth]
  },
  {
    path: 'signin',
    loadComponent: () => import('./modules/global/pages/signin/signin').then((m) => m.Signin),
    canActivate:[Auth]
  },
  {
    path: 'register',
    loadComponent: () => import('./modules/global/pages/register/register').then((m) => m.Register),
    canActivate:[Auth]
  }
];
