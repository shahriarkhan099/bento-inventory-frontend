import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @Input() user : any | undefined;

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://getbento.vercel.app/logout';
  }
}