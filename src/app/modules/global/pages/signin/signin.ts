import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { User } from '../../services/user/user';
import { Loading } from '../../components/loading/loading';
import { ButtonTheme } from '../../components/button-theme/button-theme';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';

@Component({
  selector: 'app-signin',
  imports: [CommonModule, FormsModule, Loading, ButtonTheme, ReactiveFormsModule, ButtonModule, IconFieldModule, InputIconModule],
  standalone: true,
  templateUrl: './signin.html',
  styleUrl: './signin.scss'
})
export class Signin {
  private router = inject(Router);
  messageService = inject(MessageService);
  userService = inject(User);

  isPasswordVisible: boolean = false;
  signinForm! : FormGroup;
  isLoading: boolean = false;

  constructor() {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }

  togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  async onSubmit() {
    if (!this.signinForm.value.email || !this.signinForm.value.password) {
      this.messageService.add({severity:'warn', summary: 'Aviso', detail: 'Por favor, preencha todos os campos.'});
    }else{
      this.isLoading = true;
      const response = await this.userService.signin(this.signinForm.value);
      this.isLoading = false;

      if(response){
        this.messageService.add({severity:'success', summary: 'Sucesso', detail: 'Login realizado com sucesso!'});
        this.router.navigate(['/home']);
      }
    }
  }
} 
