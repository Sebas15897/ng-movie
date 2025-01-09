import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { Subject, Observable, takeUntil } from 'rxjs';
import { LayoutState } from '../../store/layout/layout.state';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    HeaderComponent,
    SidebarComponent,
    RouterOutlet,
    MatSidenavModule,
    MatExpansionModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})

export class LayoutComponent implements OnInit, OnDestroy {
  private destroy: Subject<boolean> = new Subject();
  showMenu$: Observable<boolean> = new Observable();
  isOpenMenu: boolean = false;

  constructor(private store: Store) {
    this.showMenu$ = this.store.select(LayoutState.showMenu);
  }

  ngOnInit() {
    this.subscribeState();
  }

  subscribeState() {
    this.showMenu$.pipe(takeUntil(this.destroy)).subscribe((show) => {
      this.isOpenMenu = show;
    });
  }

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
