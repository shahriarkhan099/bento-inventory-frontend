import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'https://inventory-server-klzl.onrender.com/v1/order/restaurant';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getOrders(restaurantId: number): Observable<Order[]> {
    return this.http
      .get<{ orders: Order[] }>(`${this.apiUrl}/${restaurantId}`).pipe(map((response) => response.orders));
  }
  
  addOrder(orders: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${orders.restaurantId}`, orders).pipe(tap(() => {this._refreshNeeded$.next();})
    );
  }

  editOrder(orderId: number, orders: any): Observable<any> {
    return this.http
      .put<void>(`${this.apiUrl}/${orderId}`, orders)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteOrder(orderId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${orderId}`);
  }

  searchOrderByName(restaurantId: number, name: string): Observable<Order> {
    return this.http
      .get<{ ingredient: Order }>(
        `${this.apiUrl}/${restaurantId}/search/`, { params: { searchTerm: name } }).pipe(map((response) => response.ingredient));
  }
}
