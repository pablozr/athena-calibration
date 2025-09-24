import { inject, Injectable } from '@angular/core';
import { Localstorage } from '../localstorage/localstorage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Theme {
  private localStorage = inject(Localstorage);

  private theme = new BehaviorSubject<string>('dark');
  themeInformation = this.theme.asObservable();

  constructor() {
    const localTheme = this.localStorage.getLocalStorage('THEME-BASIC-TEMPLATE');

    if (localTheme) {
      this.theme.next(localTheme);
    }

    const linkElement = document.createElement('html');
    if(linkElement !== null) {
      if (localTheme === 'dark') {
        linkElement.classList.add('my-app-dark');
      }
    }
  }

  toggleDarkMode(): void {
    const element = document.querySelector('html');
    if (element !== null) {
      element.classList.toggle('my-app-dark');

      const themeValue = element.classList.contains('my-app-dark') ? 'dark' : 'light';
      this.localStorage.setLocalStorage('THEME-BASIC-TEMPLATE', themeValue);
      this.theme.next(themeValue);
    }
  }
}
