import { Component } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Sidebar } from '../sidebar/sidebar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, Sidebar],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {

}
