import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { Store } from '@ngxs/store';
import { SearchMovies } from '../../core/store/movie/movie.actions';
import { Observable, Subject, takeUntil } from 'rxjs';
import { MovieState } from '../../core/store/movie/movie.state';
import { InputSearchComponent } from '../../core/shared/input-search/input-search.component';
import { IGetMovie } from '../../core/interfaces/movie.interface';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    InputSearchComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})

export class HomeComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject<boolean>();

  getSearchMovies$: Observable<IGetMovie[]> = new Observable();
  listMovies: IGetMovie[] = [];

  constructor(private store: Store, private router: Router) {
    this.getSearchMovies$ = this.store.select(MovieState.searchMoviesSelect);
  }
  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.getSearchMovies$.pipe(takeUntil(this.destroy)).subscribe((resp) => {
      this.listMovies = resp;
    });
  }

  search(event: string) {
    this.store.dispatch(new SearchMovies(event));
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
