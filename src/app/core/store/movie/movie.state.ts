import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  SearchMovies,
  GetMovieDetails,
  GetPopularMovies,
} from './movie.actions';
import { tap } from 'rxjs/operators';
import { MovieService } from '../../services/movie/movie.service';
import { IGetMovie, IGetMovieResponse } from '../../interfaces/movie.interface';

export interface MovieStateModel {
  popularMovies: IGetMovieResponse;
  searchMovies: IGetMovie[];
  selectMovie: IGetMovie;
}

@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    searchMovies: [],
    popularMovies: null,
    selectMovie: null,
  },
})

@Injectable()
export class MovieState {
  @Selector()
  static searchMoviesSelect(state: MovieStateModel): IGetMovie[] {
    return state.searchMovies;
  }

  @Selector()
  static movieByIdSelect(state: MovieStateModel): IGetMovie {
    return state.selectMovie;
  }

  @Selector()
  static popularMoviesSelect(state: MovieStateModel): IGetMovieResponse {
    return state.popularMovies;
  }

  constructor(private movieService: MovieService) {}

  @Action(SearchMovies)
  searchMovies(ctx: StateContext<MovieStateModel>, action: SearchMovies) {
    return this.movieService.searchMovies(action.query).pipe(
      tap((response) => {
        ctx.patchState({ searchMovies: response.results });
      })
    );
  }

  @Action(GetMovieDetails)
  getMovieDetails(ctx: StateContext<MovieStateModel>, action: GetMovieDetails) {
    return this.movieService.getMovieDetails(action.movieId).pipe(
      tap((response) => {
        ctx.patchState({ selectMovie: response });
      })
    );
  }

  @Action(GetPopularMovies)
  getPopularMovies(ctx: StateContext<MovieStateModel>, action: GetPopularMovies) {
    return this.movieService.getPopularMovies(action.page).pipe(
      tap((response) => {
        ctx.patchState({ popularMovies: response });
      })
    );
  }
}
