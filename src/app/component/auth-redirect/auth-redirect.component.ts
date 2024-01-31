import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-auth-redirect',
  templateUrl: './auth-redirect.component.html',
  styleUrl: './auth-redirect.component.css'
})
export class AuthRedirectComponent {

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    const code = this.route.snapshot.queryParamMap.get('code')
    console.log(code);
    if (code) {
      // localStorage.setItem('accessToken', code);
      this.authService.authenticate(code).subscribe({
        next: () => this.router.navigateByUrl('/inventory-ingredients'),
        error: () => window.location.href = 'https://getbento.vercel.app/login'
      })
    } else window.location.href = 'https://getbento.vercel.app/login'
  }

}