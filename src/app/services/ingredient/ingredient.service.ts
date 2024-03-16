import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IIngredient, IIngredientCreation } from '../../models/ingredient.model';
import { ConfigService } from '../config/config.service';
import { IIngredientAsset } from '../../models/assets.model';

@Injectable({
  providedIn: 'root',
})
export class IngredientService {

  private ingredientMappings: Record<string, number> = {};
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.loadIngredientMappings();
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  loadIngredients(): Observable<IIngredientAsset[]> {
    return this.http.get<IIngredientAsset[]>('../../assets/ingredients.json');
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

  getIngredients(restaurantId: number): Observable<IIngredient[]> {
    return this.http
      .get<{ ingredients: IIngredient[] }>(
        `${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/ingredients/categories`
      )
      .pipe(map((response) => response.ingredients));
  }
  
  addIngredient(ingredient: IIngredientCreation): Observable<void> {
    return this.http.post<void>(`${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${ingredient.restaurantId}`, ingredient).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editIngredient(ingredientId: number, ingredient: IIngredientCreation): Observable<void> {
    return this.http
      .put<void>(`${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${ingredientId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteIngredient(ingredientId: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${ingredientId}`);
  }

  searchIngredientByName(restaurantId: number, name: string): Observable<IIngredient> {
    return this.http
      .get<{ ingredient: IIngredient }>(
        `${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.ingredient));
  }

  getIngredientByIngredientUniqueId (restaurantId: number, ingredientUniqueId: number): Observable<IIngredient> {
    return this.http
      .get<{ ingredient: IIngredient }>(
        `${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/${ingredientUniqueId}`
      )
      .pipe(map((response) => response.ingredient));
  }

}
