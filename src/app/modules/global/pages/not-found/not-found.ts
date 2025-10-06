import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { Header } from '../../components/header/header';

@Component({
  selector: 'app-not-found',
  imports: [ButtonModule, Header],
  standalone: true,
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound {

  constructor(
    private router: Router,
    private location: Location
  ) {}

  goHome(): void {
    this.router.navigate(['/home']);
  }

  goBack(): void {
    this.location.back();
  }
}
