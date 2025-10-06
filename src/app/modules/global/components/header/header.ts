import { Component, inject } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { Sidebar } from '../sidebar/sidebar';
import { User } from '../../services/user/user';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, Sidebar, AvatarModule],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class Header {
  userService = inject(User);

  userDetails: any = {};

  ngOnInit() {
    this.userService.userData$.subscribe(user => {
      this.userDetails = user;
    });
  }
}
