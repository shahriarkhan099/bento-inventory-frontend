import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from '../config/config.service';
import { IMessage } from '../../models/message.model';

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private tokenKey = 'token';

  constructor(private http: HttpClient, private configService: ConfigService) {}

  authenticate(code: string): Observable<IMessage> {
    const url = `${this.configService.getInventoryApiUrl()}/auth/token/${code}`;
    return this.http.get<IMessage>(url);
  }

  getRestaurantId(): Observable<IMessage> {
    const url = `${this.configService.getInventoryApiUrl()}/auth/resId`;
    return this.http.get<IMessage>(url);
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(this.tokenKey);
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
  
}
