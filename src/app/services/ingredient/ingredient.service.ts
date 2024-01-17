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

  private ingredientMappings: Record<string, number> = {};

  constructor(private http: HttpClient) {
    this.loadIngredientMappings();
  }

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  loadIngredients(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/ingredients.json');
  }

  async loadIngredientMappings() {
    const ingredients = await this.loadIngredients().toPromise();
    if (ingredients) {
      ingredients.forEach((ingredient) => {
        this.ingredientMappings[ingredient.ingredientName] = ingredient.uniqueIngredientId;
      });
    }
  }

  getIngredientMappings(): Record<string, number> {
    return this.ingredientMappings;
  }

  getIngredients(restaurantId: number): Observable<Ingredient[]> {
    return this.http
      .get<{ ingredients: Ingredient[] }>(
        `${this.apiUrl}/${restaurantId}/ingredients/categories`
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

  searchIngredientByName(restaurantId: number, name: string): Observable<Ingredient> {
    return this.http
      .get<{ ingredient: Ingredient }>(
        `${this.apiUrl}/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.ingredient));
  }
}
