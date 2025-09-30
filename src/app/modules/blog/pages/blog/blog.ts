import { Component, inject, OnInit } from '@angular/core';
import { IPost, IPostCreate, IPostUpdate } from '../../interfaces/IPost';
import { Post } from '../../services/post/post';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { Header } from '../../../global/components/header/header';
import { Loading } from '../../../global/components/loading/loading';
import { User } from '../../../global/services/user/user';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ICommentCreate, ICommentUpdate } from '../../interfaces/IComment';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, CardModule, ButtonModule, Header, Loading, DialogModule, FormsModule],
  standalone: true,
  templateUrl: './blog.html',
  styleUrl: './blog.scss'
})
export class Blog implements OnInit {
  private postService = inject(Post);
  private userService = inject(User);

  posts: IPost[] = []
  isLoading = false;
  userDetails: any = {};
  showAddPostDialog: boolean = false;
  showAddCommentDialog: boolean = false;
  showEditPostDialog: boolean = false;
  showEditCommentDialog: boolean = false;
  newPost: IPostCreate = { title: '', content: '', author_id: this.userDetails.user?.id };
  newComment: ICommentCreate = {author_id: this.userDetails.user?.id, post_id: 0, content: '' };
  updatedPost: IPostUpdate = { post_id: 0, title: '', content: '', author_id: this.userDetails.user?.id };
  updatedComment: ICommentUpdate = { comment_id: 0, content: '', author_id: this.userDetails.user?.id, post_id: 0 };

  ngOnInit(): void {
    this.userService.userData$.subscribe(user => {
      this.userDetails = user;
      this.getPosts();
    });
  }

  onOpenAddPostDialog() {
    this.showAddPostDialog = true;
  }

  async onShowAllComments(post_id: number) {
    this.isLoading = true;

    const response = await this.postService.getCommentsByPostId(post_id);

    if (response && response.data) {
      this.posts = this.posts.map(post => {
        if(post.id === post_id){
          post.comments = response.data;
          post.commentsShown = !post.commentsShown;
          this.isLoading = false;
        }
        return post;
      });
    }
  }

  onOpenAddCommentDialog(post_id: number) {
    this.newComment.post_id = post_id;
    this.showAddCommentDialog = true;
  }

  onOpenEditPostDialog(post_id: number) {
    this.updatedPost.post_id = post_id;
    this.showEditPostDialog = true;
  }

  onOpenEditCommentDialog(comment_id: number | undefined, post_id: number) {
    this.updatedComment.comment_id = comment_id;
    this.updatedComment.post_id = post_id;
    this.showEditCommentDialog = true;
  }


  async getPosts() {
    this.isLoading = true;

    const response = await this.postService.getPosts();

    if (response && response.data) {
      this.posts = response.data;
      this.isLoading = false;
    }
  }

  async addPost(){
    this.isLoading = true;

    if(!this.userDetails.user?.id){
      this.isLoading = false;
      return;
    }

    this.newPost.author_id = this.userDetails.user?.id;

    const response = await this.postService.createPost(this.newPost);

    if(response && response.data){
      
      // aqui quando adiciono um post novo o author name fica vazio ate eu dar f5, pq o banco de dados so me retornar o id do author que deu insert no bd
      // portanto n tem como eu no returning do insert ja retornar o nome, eu teria q fazer outra query pra buscar o nome usando o id retornado oq eh ineficiente

      this.posts = [response.data, ...this.posts];
      this.isLoading = false;
      this.showAddPostDialog = false;
      this.newPost = { title: '', content: '', author_id: this.userDetails.user?.id };
    }
  }

  async updatePost(){
    this.isLoading = true;

    if(!this.userDetails.user?.id){
      this.isLoading = false;
      return;
    }

    this.updatedPost.author_id = this.userDetails.user?.id;

    const response = await this.postService.updatePost(this.updatedPost);

    if(response && response.data){
      this.posts = this.posts.map(post => post.id === response.data.id ? { ...post, ...response.data } : post);
      this.isLoading = false;
      this.showEditPostDialog = false;
      this.updatedPost = { title: '', content: '', post_id: 0, author_id: this.userDetails.user?.id };
    }
  }

  async deletePost(post_id: number){
    this.isLoading = true;

    if(!this.userDetails.user?.id){
      this.isLoading = false;
      return;
    }

    const user_id = this.userDetails.user?.id;

    const response = await this.postService.deletePost(post_id, user_id);

    if(response && response.data){
      this.posts = this.posts.filter(post => post.id !== post_id);
      this.isLoading = false;
    }
  }

  async addComment(){
    this.isLoading = true;

    if(!this.userDetails.user?.id){
      this.isLoading = false;
      return;
    }

    this.newComment.author_id = this.userDetails.user?.id;

    const response = await this.postService.createComment(this.newComment);

    if(response && response.data){

      // logica para atualizar o post com novo comentario em tempo real, basicamente se nao tiver comentario ele atualiza o primeiro comentario pra ser exibido

      this.posts = this.posts.map(post => {
        if(post.id === this.newComment.post_id){
          if(!post.first_comment_content){ // se ele nao tiver o primeiro comentario ja boto ele la, caso ele tenha so adiciono normal via api e defino o id pra aparecer tudo direto
            post.first_comment_content = response.data.content;
          }
            post.first_comment_author_id = response.data.author_id;
        }
        return post;
      });

      this.isLoading = false;
      this.showAddCommentDialog = false;
      this.newComment = { content: '', author_id: this.userDetails.user?.id, post_id: 0 };
    }
  }

  async updateComment(){
    this.isLoading = true;

    if(!this.userDetails.user?.id){
      this.isLoading = false;
      return;
    }

    this.updatedComment.author_id = this.userDetails.user?.id;

    const response = await this.postService.updateComment(this.updatedComment);

    if(response && response.data){
      this.posts = this.posts.map(post => {
        if(post.id === this.updatedComment.post_id){
            if (post.comments) { // ou seja se eu tiver aberto o ver mais comentarios esse codigo funciona pra editar com o ver mais comentarios aberto
              post.comments = post.comments.map(comment => comment.id === this.updatedComment.comment_id ? { ...comment, ...response.data } : comment);
              post.first_comment_content = post.comments.length > 0 ? post.comments[post.comments.length - 1].content : '';
            }else{ // esse eh pra caso eu n esteja com o ver mais aberto, ou seja quero editar o primeiro comentario que ta sendo exibido
              if(post.first_comment_content && post.first_comment_author_id === this.userDetails.user?.id){ // se tiver o primeiro comentario e o id do author for igual ao id do usuario logado eu edito
                post.first_comment_content = response.data.content;
              }
            }
        }
        return post;
      });
      this.isLoading = false;
      this.showEditCommentDialog = false;
      this.updatedComment = { comment_id: 0, content: '', author_id: this.userDetails.user?.id, post_id: 0 };
    }
  }

  // eu passo o id do post pra eu saber qual post atualizar na lista de posts

  async deleteComment(comment_id: number | undefined, post_id: number){
    this.isLoading = true;

    if(!this.userDetails.user?.id){
      this.isLoading = false;
      return;
    }

    const user_id = this.userDetails.user?.id;

    const response = await this.postService.deleteComment(comment_id, user_id);

    if(response && response.data){
      this.posts = this.posts.map(post => {
        if(post.id === post_id){
            if (post.comments) { // ou seja se eu tiver aberto o ver mais comentarios esse codigo funciona pra deletar com o ver mais comentarios aberto
              post.comments = post.comments.filter(comment => comment.id !== comment_id);
              post.first_comment_content = post.comments.length > 0 ? post.comments[post.comments.length - 1].content : '';
            }else{ // esse eh pra caso eu n esteja com o ver mais aberto, ou seja quero excluir o primeiro comentario que ta sendo exibido
              post.first_comment_content = '';
            }
        }
        return post;
      });
      this.isLoading = false;
    }
  }
}
