import { Component } from '@angular/core';
import { LocalStorageService } from './services/localStorage/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isCollapsed = false;

  constructor() { }
  
  logout () {
    localStorage.removeItem('accessToken');
    LocalStorageService.logout();
    window.location.href = 'https://getbento.vercel.app/logout';
  }

}
