import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IIngredient } from '../../models/ingredient.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class ConsumptionLogService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getIngredients(restaurantId: number): Observable<IIngredient[]> {
    return this.http
      .get<{ ingredients: IIngredient[] }>(
        `${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}`
      )
      .pipe(map((response) => response.ingredients));
  }

  searchIngredientByName(restaurantId: number, name: string): Observable<IIngredient> {
    return this.http
      .get<{ ingredient: IIngredient }>(
        `${this.configService.getInventoryApiUrl()}/v1/ingredient/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.ingredient));
  }

}
