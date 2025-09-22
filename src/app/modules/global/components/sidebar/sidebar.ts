import { Component, inject } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.html',
    styleUrls: ['./sidebar.scss'],
    standalone: true,
    imports: [DrawerModule, ButtonModule]
})
export class Sidebar {
  private router = inject(Router)

  visible: boolean = false;

  avigateTo(route: string){
    this.visible = false;
    this.router.navigate([route]);
  }

  onMenuItemClick(){
    this.visible = false;
  }
}