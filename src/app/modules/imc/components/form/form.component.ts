import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { ToastModule } from 'primeng/toast';
import { ImcService } from '../../services/imc/imc-service.service';
import { CardModule } from 'primeng/card';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ButtonModule, InputNumberModule, ToastModule, FormsModule, RouterModule, CardModule, TagModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {
  imcService = inject(ImcService);
  private router = inject(Router);

  peso: number | null = null;
  altura: number | null = null;
  imcClassificacao: string = '';
  imc: number | null = null;

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  calcularImc() {
      const resultado = this.imcService.calcularIMC(this.peso, this.altura);
      this.imcClassificacao = resultado.classificacao;
      this.imc = resultado.imc;
      this.peso = null;
      this.altura = null;
  }

  getImcPosition(): number {
    if (!this.imc) return 0;
    
    // Mapeamento: 15 = 0%, 18.5 = 25%, 25 = 50%, 30 = 75%, 40+ = 100%
    if (this.imc < 18.5) {
      return (this.imc / 18.5) * 25;
    } else if (this.imc < 25) {
      return 25 + ((this.imc - 18.5) / 6.5) * 25;
    } else if (this.imc < 30) {
      return 50 + ((this.imc - 25) / 5) * 25;
    } else {
      return Math.min(75 + ((this.imc - 30) / 10) * 25, 100);
    }
  }
}
