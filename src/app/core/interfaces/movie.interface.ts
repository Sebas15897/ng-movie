export interface IGetMovieResponse {
  page: number;
  results: IGetMovie[];
  total_pages: number;
  total_results: number;
}

export interface IGetMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: Date;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  genres?: IGenre[];
}

export interface IGenre {
  id: number;
  name: string;
}
