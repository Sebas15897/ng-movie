import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/pages.routing').then((m) => m.pagesRoutes),
  },
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full',
  },
];
