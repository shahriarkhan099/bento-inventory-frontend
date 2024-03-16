import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ConfigService } from '../config/config.service';
import { ICategoryAsset } from '../../models/assets.model';
import { ICategory } from '../../models/category.model';

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

  loadCategories(): Observable<ICategoryAsset[]> {
    return this.http.get<ICategoryAsset[]>('../../assets/categories.json');
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
  
  addCategory(category: ICategory): Observable<void> {
    return this.http.post<void>(`${this.configService.getInventoryApiUrl()}/v1/category/restaurant/${category.restaurantId}`, category).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

}
