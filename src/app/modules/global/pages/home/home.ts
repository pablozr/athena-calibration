import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from '../../components/sidebar/sidebar';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, ButtonModule, ToolbarModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
