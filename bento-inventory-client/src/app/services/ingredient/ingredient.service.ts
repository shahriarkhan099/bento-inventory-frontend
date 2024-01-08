import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {
  private apiUrl = 'http://localhost:4000/v1/ingredient/restaurant';
  constructor(private http: HttpClient) {}

  getIngredients(restaurantId: number): Observable<any[]> {
    return this.http
      .get<{ ingredients: any[] }>(
        `${this.apiUrl}/${restaurantId}/ingredients/categories`
      )
      .pipe(map((response) => response.ingredients));
  }

  deleteIngredient(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/ingredients/${id}`);
  }

  editIngredient(
    ingredientId: number,
    ingredient: any
  ): Observable<any> {
    return this.http.put<void>(
      `${this.apiUrl}/ingredients/${ingredientId}`,
      ingredient
    );
  }

  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/1`, ingredient);
  }

  findIngredientById(ingredientId: number): Observable<Ingredient> {
    return this.http
      .get<{ ingredient: Ingredient }>(
        `${this.apiUrl}/ingredients/${ingredientId}`
      )
      .pipe(map((response) => response.ingredient));
  }
}
