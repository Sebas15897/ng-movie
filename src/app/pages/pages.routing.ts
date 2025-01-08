import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const pagesRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
