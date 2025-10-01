import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ITodo } from '../../interfaces/ITodo';
import { TodoService } from '../../services/todo/todo';
import { CheckboxModule } from 'primeng/checkbox';
import { Header } from '../../../global/components/header/header';
import { Loading } from '../../../global/components/loading/loading';
import { DialogModule } from 'primeng/dialog';

@Component({
  selector: 'app-todo',
  imports: [CommonModule, FormsModule, ButtonModule, CardModule, CheckboxModule, DialogModule, Header, Loading],
  standalone: true,
  templateUrl: './todo.html',
  styleUrl: './todo.scss'
})
export class Todo implements OnInit {
  private todoService = inject(TodoService);

  todos: ITodo[] = [];
  isLoading: boolean = false;
  displayAddDialog: boolean = false;
  displayEditDialog: boolean = false;
  newTodo: ITodo = {
    _id: '',
    description: '',
    completed: false
  };
  updatedTodo: ITodo = {
    _id: '',
    description: '',
    completed: false
  };

  ngOnInit(): void {
    this.getTodos();
  }

  onOpenAddDialog() {
    this.displayAddDialog = true;
  }

  onOpenEditDialog(id: string) {
    this.updatedTodo._id = id;
    this.displayEditDialog = true;
  }

  async getTodos(){
    this.isLoading = true;

    const response = await this.todoService.getTodos();

    if (response && response.data) {
      this.todos = response.data;
      this.isLoading = false;
    }
  }

  async addTodo() {
    this.isLoading = true;

    const response = await this.todoService.addTodo(this.newTodo.description);

    if (response && response.data) {
      this.todos = [response.data, ...this.todos];
      this.newTodo.description = '';
      this.displayAddDialog = false;
      this.isLoading = false;
    }
  }

  async updateTodo(){
    this.isLoading = true;

    const response = await this.todoService.updateTodo(this.updatedTodo);

    if (response && response.data) {
      this.todos = this.todos.map(todo => {
        if (todo._id === this.updatedTodo._id) {
          todo.description = this.updatedTodo.description;
          this.displayEditDialog = false;
          this.updatedTodo.description = '';
        }
        return todo;
      });
      this.isLoading = false;
    }
  }

  async deleteTodo(id: string) {
    this.isLoading = true;

    const response = await this.todoService.deleteTodo(id);

    if (response && response.data) {
      this.todos = this.todos.filter(todo => todo._id !== id);
      this.isLoading = false;
    }
  }

  async toggleTodo(id: string) {
    this.isLoading = true;

    const response = await this.todoService.toggleTodo(id);

    if (response && response.data) {
      this.todos = this.todos.map(todo => {
        if (todo._id === id) {
          todo.completed = response.data.completed;
        }
        return todo;
      });
      this.isLoading = false;
    }
  }

}
