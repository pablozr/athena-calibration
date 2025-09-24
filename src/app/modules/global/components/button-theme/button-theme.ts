import { Component, inject, OnInit } from '@angular/core';
import { Theme } from '../../services/theme/theme';
import { ToggleButtonModule } from 'primeng/togglebutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-button-theme',
  imports: [ToggleButtonModule, CommonModule, FormsModule],
  standalone: true,
  templateUrl: './button-theme.html',
  styleUrl: './button-theme.scss'
})
export class ButtonTheme implements OnInit {
  themeService = inject(Theme);

  themeData!: string;
  isDarkMode: boolean = true;

  ngOnInit(): void {
    this.themeService.themeInformation.subscribe(theme => {
      this.themeData = theme;
      if (theme === 'dark') {
        this.isDarkMode = true;
      } else {
        this.isDarkMode = false;
      }
    });
  }

  toggleLightDark(): void {
    this.themeService.toggleDarkMode();
  }
}
