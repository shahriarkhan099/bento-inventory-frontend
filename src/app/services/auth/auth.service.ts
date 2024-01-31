import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private tokenKey = 'token';

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getInventoryApiUrl(): string {
    return this.configService.getInventoryApiUrl();
  }

  authenticate(code: string) {
    const url = `${this.getInventoryApiUrl()}/auth/token/${code}`;
    return this.http.get(url);
  }

  getRestaurantId(): Observable<any> {
    const url = `${this.configService.getInventoryApiUrl()}/v1/authRouter/resId`;
    return this.http.get(url);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  
}
