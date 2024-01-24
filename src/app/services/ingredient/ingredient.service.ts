import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ingredient } from '../../models/ingredient.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {

  private ingredientMappings: Record<string, number> = {};
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.loadIngredientMappings();
  }

  getInventoryApiUrl(): string {
    return this.configService.getInventoryApiUrl();
  }

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
        `${this.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/ingredients/categories`
      )
      .pipe(map((response) => response.ingredients));
  }
  
  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.getInventoryApiUrl()}/v1/ingredient/restaurant/${ingredient.restaurantId}`, ingredient).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editIngredient(ingredientId: number, ingredient: any): Observable<any> {
    return this.http
      .put<void>(`${this.getInventoryApiUrl()}/v1/ingredient/restaurant/${ingredientId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteIngredient(ingredientId: number): Observable<void> {
    return this.http.delete<void>(`${this.getInventoryApiUrl()}/v1/ingredient/restaurant/${ingredientId}`);
  }

  searchIngredientByName(restaurantId: number, name: string): Observable<Ingredient> {
    return this.http
      .get<{ ingredient: Ingredient }>(
        `${this.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.ingredient));
  }

  getIngredientByIngredientUniqueId (restaurantId: number, ingredientUniqueId: number): Observable<Ingredient> {
    return this.http
      .get<{ ingredient: Ingredient }>(
        `${this.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/${ingredientUniqueId}`
      )
      .pipe(map((response) => response.ingredient));
  }

}
