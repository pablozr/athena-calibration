import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { StyleClassModule } from 'primeng/styleclass';
import { ButtonTheme } from '../button-theme/button-theme';
import { User } from '../../services/user/user';
@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss'],
    standalone: true,
    imports: [DrawerModule, ButtonModule, RippleModule, StyleClassModule, ButtonTheme]
})
export class Sidebar {
  private router = inject(Router)
  private userService = inject(User);

  visible: boolean = false;

  navigateTo(route: string){
    this.visible = false;
    this.router.navigate([route]);
  }

  signout(){
    this.userService.signout();
    this.router.navigate(['/signin']);
  }

  onMenuItemClick(){
    this.visible = false;
  }
}