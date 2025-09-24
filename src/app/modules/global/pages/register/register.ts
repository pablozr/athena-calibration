import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { User } from '../../services/user/user';
import { MessageService } from 'primeng/api';
import { Loading } from '../../components/loading/loading';
import { ButtonTheme } from '../../components/button-theme/button-theme';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ButtonModule, Loading, ButtonTheme],
  standalone: true,
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  private router = inject(Router);
  userService = inject(User);
  messageService = inject(MessageService);

  isLoading: boolean = false;
  isPasswordVisible: boolean = false;
  registerForm!: FormGroup;

  constructor(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  togglePasswordVisibility(){
    this.isPasswordVisible = !this.isPasswordVisible
  }

  async onSubmit() {
    if (!this.registerForm.value.username || !this.registerForm.value.email || !this.registerForm.value.password) {
      this.messageService.add({severity:'warn', summary: 'Aviso', detail: 'Por favor, preencha todos os campos.'});
    } else {
      this.isLoading = true;
      const response = await this.userService.register(this.registerForm.value);
      this.isLoading = false;
      if (response) {
        this.router.navigate(['/signin']);
      }
    }
  }

}
