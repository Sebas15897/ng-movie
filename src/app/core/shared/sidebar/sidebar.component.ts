import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { IMenu, IChildMenu } from '../../interfaces/menu.interface';
import { Menu } from '../../utils/menu';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, MatDividerModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})

export class SidebarComponent {
  sideMenu: IMenu[] = Menu;
  selectChild = `admin/home`;

  constructor(private router: Router) {}

  navigateTo(menu: IChildMenu) {
    this.selectChild = menu.path;
    this.router.navigate([menu.path]);
  }

  getSelected(menu: IChildMenu): boolean {
    return menu.path === this.selectChild;
  }
}
