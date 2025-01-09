import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppSettings } from '../../utils/app-settings';
import { IGetMovie, IGetMovieResponse } from '../../interfaces/movie.interface';

@Injectable({
  providedIn: 'root',
})

export class MovieService {
  constructor(private http: HttpClient, private appSettings: AppSettings) {}

  searchMovies(query: string): Observable<IGetMovieResponse> {
    const params = new HttpParams().set('query', query);

    const url = this.appSettings.movies.urls.getMovies;
    return this.http.get<IGetMovieResponse>(url, { params });
  }

  getMovieDetails(movieId: number): Observable<IGetMovie> {
    const url = this.appSettings.movies.urls.getDetailMovie;
    return this.http.get<IGetMovie>(`${url}/${movieId}`);
  }

  getPopularMovies(): Observable<IGetMovieResponse> {
    const url = this.appSettings.movies.urls.getPopularMovies;
    return this.http.get<IGetMovieResponse>(url);
  }
}
