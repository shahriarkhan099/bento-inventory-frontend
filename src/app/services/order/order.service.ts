import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from '../../models/order.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getOrders(restaurantId: number): Observable<Order[]> {
    return this.http
      .get<{ orders: Order[] }>(`${this.configService.getInventoryApiUrl()}/v1/order/restaurant/${restaurantId}`).pipe(map((response) => response.orders));
  }
  
  addOrder(orders: any): Observable<any> {
    return this.http.post(`${this.configService.getInventoryApiUrl()}/v1/order/restaurant/${orders.restaurantId}`, orders).pipe(tap(() => {this._refreshNeeded$.next();})
    );
  }

  editOrder(orderId: number, orders: any): Observable<any> {
    return this.http
      .put<void>(`${this.configService.getInventoryApiUrl()}/v1/order/restaurant/${orderId}`, orders)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.getInventoryApiUrl()}/v1/order/restaurant/${orderId}`);
  }

  searchOrderByName(restaurantId: number, name: string): Observable<Order> {
    return this.http
      .get<{ ingredient: Order }>(
        `${this.configService.getInventoryApiUrl()}/v1/order/restaurant/${restaurantId}/search/`, { params: { searchTerm: name } }).pipe(map((response) => response.ingredient));
  }

}
