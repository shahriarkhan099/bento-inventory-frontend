import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IIngredient } from '../../models/ingredient.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {

  private categoryMappings: Record<string, number> = {};
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {
    this.loadCategoryMappings();
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  loadCategories(): Observable<any[]> {
    return this.http.get<any[]>('../../assets/categories.json');
  }

  async loadCategoryMappings() {
    const categories = await this.loadCategories().toPromise();
    if (categories) {
      categories.forEach((category) => {
        this.categoryMappings[category.categoryName] = category.uniqueCategoryId;
      });
    }
  }

  getCategoryMappings(): Record<string, number> {
    return this.categoryMappings;
  }

  getCategoryByName(restaurantId: number, categoryName: string): Observable<any> {
    return this.http.get<any>(`${this.configService.getInventoryApiUrl()}/v1/category/restaurant/${restaurantId}/search/`, { params: { q: categoryName } })
    .pipe(map((response) => response.categories));
  }
  
  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.configService.getInventoryApiUrl()}/v1/category/restaurant/${category.restaurantId}`, category).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

}
