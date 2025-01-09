export class SearchMovies {
  static readonly type = '[Movie] Search Movies';
  constructor(public query: string) {}
}

export class GetMovieDetails {
  static readonly type = '[Movie] Get Movie Details';
  constructor(public movieId: number) {}
}

export class GetPopularMovies {
  static readonly type = '[Movie] Get Popular Movies';
}
