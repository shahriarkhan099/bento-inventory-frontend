import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {

  private apiUrl = 'http://localhost:4000/v1/ingredient/restaurant';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getIngredients(restaurantId: number): Observable<Ingredient[]> {
    return this.http.get<{ ingredients: Ingredient[] }>
    (`${this.apiUrl}/${restaurantId}/ingredients/categories`)
      .pipe(map((response) => response.ingredients));
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ingredients/${id}`);
  }

  editIngredient(ingredientId: number, ingredient: any): Observable<any> {
    return this.http.put<void>(`${this.apiUrl}/ingredients/${ingredientId}`, ingredient)
    .pipe(
      tap(() => {
      this._refreshNeeded$.next();
      })
    );
  }

  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/1`, ingredient)
    .pipe(
      tap(() => {
      this._refreshNeeded$.next();
      })
    );
  }

  getIngredientCategories(restaurantId: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${restaurantId}/categories`);
  }

  searchIngredientByName(name: string): Observable<Ingredient> {
    return this.http
      .get<{ ingredient: Ingredient }>(
        `${this.apiUrl}/ingredients/search/${name}`, {params: { searchTerm: name }}
      )
      .pipe(map((response) => response.ingredient));
  }


}
