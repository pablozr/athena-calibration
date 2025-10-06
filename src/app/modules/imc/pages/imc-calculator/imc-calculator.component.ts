import { Component } from '@angular/core';
import { FormComponent } from '../../components/form/form.component';
import { Header } from '../../../global/components/header/header';

@Component({
  selector: 'app-imc-calculator',
  standalone: true,
  imports: [FormComponent, Header],
  templateUrl: './imc-calculator.component.html',
  styleUrl: './imc-calculator.component.scss'
})
export class ImcCalculatorComponent {

}
