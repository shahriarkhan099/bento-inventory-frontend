import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://inventory-server-klzl.onrender.com';
  private tokenKey = 'token';

  constructor(private http: HttpClient) {}

  authenticate(code: string) {
    const url = `${this.apiUrl}/auth/token/${code}`;
    return this.http.get(url);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
