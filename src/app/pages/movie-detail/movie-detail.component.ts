import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { GetMovieDetails } from '../../core/store/movie/movie.actions';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IGetMovie } from '../../core/interfaces/movie.interface';
import { MovieState } from '../../core/store/movie/movie.state';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';

@Component({
  selector: 'app-movie-detail',
  imports: [CommonModule, MatChipsModule],
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss',
})

export class MovieDetailComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  getDetailMovie$: Observable<IGetMovie> = new Observable();
  detailMovie: IGetMovie = null;

  constructor(private route: ActivatedRoute, private store: Store) {
    const movieId = Number(this.route.snapshot.paramMap.get('movieId'));
    this.getDetailMovie$ = this.store.select(MovieState.movieByIdSelect);
    this.store.dispatch(new GetMovieDetails(movieId));
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getDetailMovie$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.detailMovie = resp;
    });
  }

  getPosterUrl(event: string): string {
    return `https://image.tmdb.org/t/p/w500${event}`;
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
