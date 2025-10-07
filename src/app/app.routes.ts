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
  },
  {
    path: 'blog',
    loadComponent: () => import('./modules/blog/pages/blog/blog').then((m) => m.Blog),
    
  },
  {
    path: 'todos',
    loadComponent: () => import('./modules/todo/pages/todo/todo').then((m) => m.Todo),
    canActivate:[Auth]
  },
  {
    path: 'admin',
    loadComponent: () => import('./modules/admin/pages/admin/admin').then((m) => m.Admin),
    canActivate:[Auth]
  },
  {
    path: 'transactions',
    loadComponent: () => import('./modules/transactions/pages/transactions/transactions.component').then((m) => m.TransactionComponent),
    canActivate:[Auth]
  },
  {
    path: 'imc',
    loadComponent: () => import('./modules/imc/pages/imc-calculator/imc-calculator.component').then((m) => m.ImcCalculatorComponent),
    canActivate:[Auth]
  },
  {
    path: 'imc/history',
    loadComponent: () => import('./modules/imc/pages/history/history.component').then((m) => m.HistoryComponent),
    canActivate:[Auth]
  },
  {
    path: '**',
    loadComponent: () => import('./modules/global/pages/not-found/not-found').then((m) => m.NotFound),
    canActivate:[Auth]
  }
];
