import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Localstorage {
  setLocalStorage(key: string, value: any): void {
    const newInformation = JSON.stringify(value);
    localStorage.setItem(key, newInformation);
  }

  getLocalStorage(key: string): any {
    const information = localStorage.getItem(key);
    return information ? JSON.parse(information) : null;
  }

  removeLocalStorage(key: string): void {
    localStorage.removeItem(key);
  }
}
