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
    const code = this.route.snapshot.queryParamMap.get('code');

    if (code) {
      // Set the code as accessToken in localStorage
      localStorage.setItem('accessToken', code);

      // Call your authService to handle authentication
      this.authService.authenticate(code).subscribe({
        next: (response:any) => {
          // Assuming response.headers.get('Authorization') contains the bearer token
          const bearerToken = response.headers.get('Authorization');
          console.log('response', bearerToken)
          // Do something with the bearer token (e.g., store it in localStorage)
          if (bearerToken) {
            const token = bearerToken.split(' ')[1];
            localStorage.setItem('accessToken', token);
          }

          // Redirect to the desired route
          this.router.navigateByUrl('/inventory-ingredients');
        },
        error: () => window.location.href = 'https://getbento.vercel.app/login'
      });
    } else {
      window.location.href = 'https://getbento.vercel.app/login';
    }
  }
  // ngOnInit(): void {
  //   const code = this.route.snapshot.queryParamMap.get('code')
  //   console.log(code);
  //   if (code) {
  //     // localStorage.setItem('accessToken', code);
  //     this.authService.authenticate(code).subscribe({
  //       next: () => this.router.navigateByUrl('/inventory-ingredients'),
  //       error: () => window.location.href = 'https://getbento.vercel.app/login'
  //     })
  //   } else window.location.href = 'https://getbento.vercel.app/login'
  // }

}