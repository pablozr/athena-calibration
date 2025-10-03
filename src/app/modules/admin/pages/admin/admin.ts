import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { IUsers } from '../../interfaces/IUser';
import { AdminService } from '../../services/admin/admin';
import { Header } from '../../../global/components/header/header';
import { Loading } from '../../../global/components/loading/loading';

@Component({
  selector: 'app-admin',
  imports: [CommonModule, ButtonModule, FormsModule, TableModule, Header, Loading],
  standalone: true,
  templateUrl: './admin.html',
  styleUrl: './admin.scss'
})
export class Admin implements OnInit {
  private adminService = inject(AdminService);

  users : IUsers[] = [];
  isLoading: boolean = false;

  ngOnInit(): void {
    this.getUsers();
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
