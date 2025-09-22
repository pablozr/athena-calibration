import { Component } from '@angular/core';
import { Header } from '../../components/header/header';
import { ButtonModule } from 'primeng/button';
import { Sidebar } from '../../components/sidebar/sidebar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Header, ButtonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
