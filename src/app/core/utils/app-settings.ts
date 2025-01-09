import { Injectable } from '@angular/core';
import packageJson from '../../../../package.json';
import { EndPoint } from './app-end-points';

@Injectable({
  providedIn: 'root',
})

export class AppSettings {
  public movies = {
    urls: {
      getMovies: EndPoint.urlBase('search/movie'),
      getDetailMovie: EndPoint.urlBase('movie'),
      getPopularMovies: EndPoint.urlBase('movie/popular')
    },
  };

  public app = {
    name: 'Ng Movie',
    version: packageJson.version,
  };
}
