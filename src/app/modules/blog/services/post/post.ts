import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { IApiResponseComment, IApiResponseComments, IApiResponseDelete, IApiResponsePost, IApiResponsePosts } from '../../interfaces/IApiResponse';
import { IPostCreate, IPostUpdate } from '../../interfaces/IPost';
import { ICommentCreate, ICommentUpdate } from '../../interfaces/IComment';

@Injectable({
  providedIn: 'root'
})
export class Post {
  http = inject(HttpClient);
  messageService = inject(MessageService);

  private apiUrl = 'http://localhost:8000/api/v1/';
  
  public getPosts(): Promise<IApiResponsePosts | false> {
    return new Promise((resolve, _) => {
      this.http.get<IApiResponsePosts>(`${this.apiUrl}posts`).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao buscar posts. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public createPost(post_data: IPostCreate): Promise<IApiResponsePost | false>{
    return new Promise((resolve, _) => {
      this.http.post<IApiResponsePost>(`${this.apiUrl}posts`, post_data).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Post criado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao criar post. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public updatePost(post_data: IPostUpdate): Promise<IApiResponsePost | false>{
    return new Promise((resolve, _) => {
      this.http.put<IApiResponsePost>(`${this.apiUrl}posts/${post_data.post_id}?user_id=${post_data.author_id}`, post_data).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Post atualizado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao atualizar post. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public deletePost(post_id: number, user_id: number): Promise<IApiResponseDelete | false>{
    return new Promise((resolve, _) => {
      this.http.delete<IApiResponseDelete>(`${this.apiUrl}posts/${post_id}?user_id=${user_id}`).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Post deletado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao deletar post. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public createComment(comment_data: ICommentCreate): Promise<IApiResponseComment | false>{
    return new Promise((resolve, _) => {
      this.http.post<IApiResponseComment>(`${this.apiUrl}comments`, comment_data).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Comentário criado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao criar comentário. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public updateComment(comment_data: ICommentUpdate): Promise<IApiResponseComment | false>{
    return new Promise((resolve, _) => {
      this.http.put<IApiResponseComment>(`${this.apiUrl}comments/${comment_data.comment_id}?user_id=${comment_data.author_id}`, comment_data).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Comentário atualizado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao atualizar comentário. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public deleteComment(comment_id: number | undefined, user_id: number): Promise<IApiResponseDelete | false>{
    return new Promise((resolve, _) => {
      this.http.delete<IApiResponseDelete>(`${this.apiUrl}comments/${comment_id}?user_id=${user_id}`).subscribe({
        next: (response) => {
          resolve(response);
          this.messageService.add({ severity: 'success', summary: 'Sucesso', detail: 'Comentário deletado com sucesso!' });
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao deletar comentário. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }

  public getCommentsByPostId(post_id: number): Promise<IApiResponseComments | false>{
    return new Promise((resolve, _) => {
      this.http.get<IApiResponseComments>(`${this.apiUrl}comments/${post_id}`).subscribe({
        next: (response) => {
          resolve(response);
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: error.error.message || 'Erro ao buscar comentários. Tente novamente.' });
          resolve(false);
        }
      });
    });
  }
}