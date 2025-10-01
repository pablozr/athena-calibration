import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IApiResponseTodo, IApiResponseTodos } from '../../interfaces/IApiResponse';
import { ITodo } from '../../interfaces/ITodo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  http = inject(HttpClient);
  messageService = inject(MessageService);

  private apiUrl = 'http://localhost:8000/api/v1/todos';

  getTodos() : Promise<IApiResponseTodos | false> {
    return new Promise((resolve, _) => {
      this.http.get<IApiResponseTodos>(this.apiUrl).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao buscar tarefas' });
          resolve(false);
        }
      });

    });
  }

  addTodo(description: string) : Promise<IApiResponseTodo | false> {
    return new Promise((resolve, _) => {
      this.http.post<IApiResponseTodo>(this.apiUrl, { description }).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarefa adicionada com sucesso' });
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao adicionar tarefa' });  
          resolve(false);
        }
      });
    });
  }

  updateTodo(todoData: ITodo) : Promise<IApiResponseTodo | false> {
    return new Promise((resolve, _) => {
      this.http.put<IApiResponseTodo>(`${this.apiUrl}/${todoData._id}`, todoData).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarefa atualizada com sucesso' });
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao atualizar tarefa' });
          resolve(false);
        }
      });
    });
  }

  deleteTodo(id: string) : Promise<IApiResponseTodo | false> {
    return new Promise((resolve, _) => {
      this.http.delete<IApiResponseTodo>(`${this.apiUrl}/${id}`).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarefa excluída com sucesso' });
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao excluir tarefa' });
          resolve(false);
        }
      });
    });
  }

  toggleTodo(id: string) : Promise<IApiResponseTodo | false> {
    return new Promise((resolve, _) => {
      this.http.patch<IApiResponseTodo>(`${this.apiUrl}/${id}`, {}).subscribe({
        next: (response) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Tarefa atualizada com sucesso' });
          resolve(response);
        },
        error: () => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Falha ao atualizar tarefa' });
          resolve(false);
        }
      });
    });
  }
}
