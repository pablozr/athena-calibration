import { Component } from '@angular/core';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-loading',
  imports: [ProgressSpinnerModule],
  standalone: true,
  templateUrl: './loading.html',
  styleUrl: './loading.scss'
})
export class Loading {

}
