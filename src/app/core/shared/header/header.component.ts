import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { MatIconRegistry } from '@angular/material/icon';
import { ShowSideBarAction } from '../../store/layout/layout.actions';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-header',
  imports: [MatButtonModule, MatTooltipModule, MatIconModule, MatMenuModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnDestroy {
  private destroy: Subject<boolean> = new Subject();
  viewSidebar = false;

  constructor(
    private store: Store,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.addMaterialIcon('bars-solid', 'assets/svg/bars-solid.svg');
    this.addMaterialIcon(
      'right-from-bracket-solid',
      'assets/svg/right-from-bracket-solid.svg'
    );
    this.addMaterialIcon('user-solid', 'assets/svg/user-solid.svg');
    this.addMaterialIcon('gear-solid', 'assets/svg/gear-solid.svg');
    this.addMaterialIcon(
      'circle-xmark-solid',
      'assets/svg/circle-xmark-solid.svg'
    );
  }

  showMenu() {
    const show = (this.viewSidebar = !this.viewSidebar);
    this.store.dispatch(new ShowSideBarAction(show));
  }

  addMaterialIcon(name: string, url: string) {
    this.matIconRegistry.addSvgIcon(
      name,
      this.domSanitizer.bypassSecurityTrustResourceUrl(url)
    );
  }

  logout() {}

  ngOnDestroy() {
    this.destroy.next(true);
    this.destroy.unsubscribe();
  }
}
