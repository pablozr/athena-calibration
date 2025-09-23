import { Routes } from '@angular/router';

export const routes: Routes = [
    {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./modules/global/pages/home/home').then((m) => m.Home)
  },
  {
    path: 'products',
    loadComponent: () => import('./modules/products/pages/dashboard/dashboard').then((m) => m.Dashboard)
  }
];
