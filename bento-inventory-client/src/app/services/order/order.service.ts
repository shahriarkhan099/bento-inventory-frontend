import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Order } from '../../models/order.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiUrl = 'http://localhost:4000/v1/order/restaurant';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getIngredients(restaurantId: number): Observable<Order[]> {
    return this.http
      .get<{ ingredients: Order[] }>(
        `${this.apiUrl}/${restaurantId}`
      )
      .pipe(map((response) => response.ingredients));
  }
  
  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${ingredient.restaurantId}`, ingredient).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editIngredient(ingredientId: number, ingredient: any): Observable<any> {
    return this.http
      .put<void>(`${this.apiUrl}/${ingredientId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteIngredient(ingredientId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${ingredientId}`);
  }

  searchIngredientByName(restaurantId: number, name: string): Observable<Order> {
    return this.http
      .get<{ ingredient: Order }>(
        `${this.apiUrl}/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.ingredient));
  }
}
