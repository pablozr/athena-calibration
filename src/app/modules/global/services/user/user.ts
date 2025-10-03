import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Localstorage } from '../localstorage/localstorage';
import { MessageService } from 'primeng/api';
import { ISigninResponse } from '../../interfaces/ISignin';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {
  private http = inject(HttpClient);
  private localStorage = inject(Localstorage);
  private messageService = inject(MessageService);

  private user = new BehaviorSubject<ISigninResponse | null>(null);
  userData$ = this.user.asObservable();

  constructor() {
    const localUser = this.localStorage.getLocalStorage('USER-INFO');
    if (localUser) {
      this.user.next(localUser);
    }
  }

  private apiUrl = 'http://localhost:8080/api';

  signin(credentials: { email: string; password: string }): Promise<boolean | false> {
    return new Promise((resolve, _) => {
      this.http.post<{ data: ISigninResponse }>(`${this.apiUrl}/auth/login`, credentials).subscribe({
        next: (response) => {
          this.user.next(response.data);
          this.localStorage.setLocalStorage('USER-INFO', response.data);
          resolve(true);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao fazer login. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  register(data: { username: string; nomeCompleto: string;email: string; password: string }): Promise<boolean | false> {
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
    this.localStorage.removeLocalStorage('USER-INFO');
    window.location.reload();
  }

  getTokenAuthorization() {
    const token = this.user.value?.acessToken;
    return new HttpHeaders({
      'Content-type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    })
  }
}
