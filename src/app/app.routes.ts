import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'expenses', pathMatch: 'full' },
  {
    path: 'expenses',
    children: [
      {
        path: '',
        loadComponent: () => import('./expenses/list-expenses/list-expenses.component').then(m => m.ListExpensesComponent)
      },
      {
        path: ':id',
        loadComponent: () => import('./expenses/person-detail/person-detail.component').then(m => m.PersonDetailComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found.component').then(m => m.PageNotFoundComponent)
  }
];
