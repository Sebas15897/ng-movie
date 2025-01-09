import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { IGetMovie, IGetMovieResponse } from '../../core/interfaces/movie.interface';
import { InputSearchComponent } from '../../core/shared/input-search/input-search.component';
import {
  GetPopularMovies,
} from '../../core/store/movie/movie.actions';
import { MovieState } from '../../core/store/movie/movie.state';

@Component({
  selector: 'app-popular',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    InputSearchComponent,
  ],
  templateUrl: './popular.component.html',
  styleUrl: './popular.component.scss',
})

export class PopularComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  getPopularMovies$: Observable<IGetMovieResponse> = new Observable();
  listMovies: IGetMovie[] = [];

  currentPage: number = 1;
  totalPages: number = 0;

  constructor(private store: Store, private router: Router) {
    this.getPopularMovies$ = this.store.select(MovieState.popularMoviesSelect);
    this.store.dispatch(new GetPopularMovies(1));
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getPopularMovies$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listMovies = resp?.results;
      this.totalPages = resp?.total_pages;
      this.currentPage = resp?.page;
    });
  }

  changePage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.store.dispatch(new GetPopularMovies(page));
    }
  }

  search(event: string) {
    if (!event.trim()) {
      this.subscribeState();
      return;
    }

    this.listMovies = this.listMovies.filter((movie) =>
      movie.title.toLowerCase().includes(event.toLowerCase())
    );
  }


  getPosterUrl(event: string): string {
    return `https://image.tmdb.org/t/p/w500${event}`;
  }

  redirectMovieById(id: number) {
    this.router.navigate([`admin/detail-movie/${id}`]);
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
