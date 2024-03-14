import { Component, Input } from '@angular/core';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
  @Input() user : IUser | undefined;

  logout () {
    localStorage.removeItem('accessToken');
    window.location.href = 'https://getbento.vercel.app/logout';
  }
  
}