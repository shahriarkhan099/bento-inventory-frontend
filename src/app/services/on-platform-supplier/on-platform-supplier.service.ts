import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IIngredient } from '../../models/ingredient.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class OnPlatformSupplierService {

  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getIngredients(restaurantId: number): Observable<IIngredient[]> {
    return this.http
      .get<{ ingredients: IIngredient[] }>(
        `${this.configService.getInventoryApiUrl()}/v1/on-platform-supplier/${restaurantId}/ingredients/categories`
      )
      .pipe(map((response) => response.ingredients));
  }
  
  addIngredient(ingredient: any): Observable<any> {
    return this.http.post(`${this.configService.getInventoryApiUrl()}/v1/on-platform-supplier/${ingredient.restaurantId}`, ingredient).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editIngredient(ingredientId: number, ingredient: any): Observable<any> {
    return this.http
      .put<void>(`${this.configService.getInventoryApiUrl()}/v1/on-platform-supplier/${ingredientId}`, ingredient)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteIngredient(ingredientId: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.getInventoryApiUrl()}/v1/on-platform-supplier/${ingredientId}`);
  }

  searchIngredientByName(restaurantId: number, name: string): Observable<IIngredient> {
    return this.http
      .get<{ ingredient: IIngredient }>(
        `${this.configService.getInventoryApiUrl()}/v1/on-platform-supplier/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.ingredient));
  }

}
