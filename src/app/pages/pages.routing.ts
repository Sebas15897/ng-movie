import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from '../core/shared/layout/layout.component';
import { MovieDetailComponent } from './movie-detail/movie-detail.component';
import { PopularComponent } from './popular/popular.component';

export const pagesRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
        title: 'Inicio',
      },
      {
        path: 'detail-movie/:movieId',
        component: MovieDetailComponent,
        title: 'Detalle de la pelicula',
      },
      {
        path: 'popular-movie',
        component: PopularComponent,
        title: 'Peliculas populares',
      },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
];
