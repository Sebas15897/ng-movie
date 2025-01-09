import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import {
  SearchMovies,
  GetMovieDetails,
  GetPopularMovies,
} from './movie.actions';
import { tap } from 'rxjs/operators';
import { MovieService } from '../../services/movie/movie.service';
import { IGetMovie } from '../../interfaces/movie.interface';

export interface MovieStateModel {
  popularMovies: IGetMovie[];
  searchMovies: IGetMovie[];
  selectMovie: IGetMovie;
}

@State<MovieStateModel>({
  name: 'movies',
  defaults: {
    searchMovies: [],
    popularMovies: [],
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
  getPopularMovies(ctx: StateContext<MovieStateModel>) {
    return this.movieService.getPopularMovies().pipe(
      tap((response) => {
        ctx.patchState({ popularMovies: response.results });
      })
    );
  }
}
