import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Localstorage } from '../localstorage/localstorage';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private localStorage = inject(Localstorage);
  private messageService = inject(MessageService);

  private apiUrl = 'http://localhost:8080/api';

  signin(credentials: { email: string; password: string }): Promise<boolean | false> {
    return new Promise((resolve, _) => {
      this.http.post<{ data: { acessToken: string } }>(`${this.apiUrl}/auth/login`, credentials).subscribe({
        next: (response) => {
          this.localStorage.setLocalStorage('token', response.data.acessToken);
          resolve(true);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao fazer login. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  register(data: { username: string; email: string; password: string }): Promise<boolean | false> {
    return new Promise((resolve, _) => {
      this.http.post(`${this.apiUrl}/auth/register`, data).subscribe({
        next: () => {
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Registro realizado com sucesso! Por favor, faça login.' });
          resolve(true);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao realizar registro. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  signout(): void {
    this.localStorage.removeLocalStorage('token');
    window.location.reload();
  }
}
