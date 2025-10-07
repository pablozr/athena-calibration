import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IUsers } from '../../interfaces/IUser';
import { AdminService } from '../../services/admin/admin';
import { Header } from '../../../global/components/header/header';
import { Loading } from '../../../global/components/loading/loading';
import { AvatarModule } from 'primeng/avatar';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ButtonModule, FormsModule, TableModule, Header, Loading, AvatarModule, TagModule, IconFieldModule, InputIconModule],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  private adminService = inject(AdminService);

  searchInput$: Subject<string> = new Subject<string>();
  users : IUsers[] = [];
  isLoading: boolean = false;
  searchInput: string = '';

  ngOnInit(): void {
    this.users = [
      {
        id: 1,
        roles: 'admin',
        displayName: 'Admin',
        email: 'admin@admin.com',
      },
      {
        id: 2,
        roles: 'admin',
        displayName: 'User',
        email: 'user@user.com',
      },
      {
        id: 3,
        roles: 'user',
        displayName: 'Admin',
        email: 'admin@admin.com',
      }
    ]
  }

  onSearchInputChange(): void{
    this.searchInput$.next(this.searchInput);
  }

  async searchByUsername() {
    this.isLoading = true;

    const response = await this.adminService.searchUsers(this.searchInput);

    if (response && response.data) {
      const filteredUsers = response.data.filter(user => user.roles.includes('USER_ROLE'));
      this.users = filteredUsers;
      this.isLoading = false;
    }
  }

  async getUsers(){
    this.isLoading = true;

    const response = await this.adminService.getUsers();

    if (response && response.data){

      const filteredUsers = response.data.filter(user => user.roles.includes('USER_ROLE'));

      this.users = filteredUsers;
      this.isLoading = false;
    }
  }

  async deleteUser(userId: number) {
    this.isLoading = true;

    const response = await this.adminService.deleteUser(userId);

    if (response && response.data) {
      this.users = this.users.filter(user => user.id !== userId);
      this.isLoading = false;
    }
  }
}
