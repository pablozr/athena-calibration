import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IUsers } from '../../interfaces/IUser';
import { IApiDeleteResponse, IApiResponseUsers } from '../../interfaces/IApiResponse';
import { User } from '../../../global/services/user/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  http = inject(HttpClient);
  messageService = inject(MessageService);
  userService = inject(User);


  private apiUrl = 'http://localhost:8080/api/users';

  getUsers() : Promise<IApiResponseUsers | false> {
    return new Promise((resolve, _) => {
      this.http.get<IApiResponseUsers>(this.apiUrl, { headers: this.userService.getTokenAuthorization() }).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao buscar usuários' });
          resolve(false);
        }
      });
    });
  }

  deleteUser(userId: number) : Promise<IApiDeleteResponse | false> {
    return new Promise((resolve, _) => {
      this.http.delete<IApiDeleteResponse>(`${this.apiUrl}/${userId}`, { headers: this.userService.getTokenAuthorization() }).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Usuário deletado com sucesso' });
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao deletar usuário' });
          resolve(false);
        }
      });
    });
  }
}
