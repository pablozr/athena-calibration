import { Component, inject } from '@angular/core';
import { Header } from '../../components/header/header';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ToolbarModule } from 'primeng/toolbar';
import { Router } from '@angular/router';
import { CardModule } from 'primeng/card';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, ButtonModule, ToolbarModule, CardModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  private router = inject(Router);

  navigateTo(route: string){
    this.router.navigate([route]);
  }

}
