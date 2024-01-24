import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Ingredient } from '../../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://inventory-server-klzl.onrender.com/v1/category/restaurant';

  private categoryMappings: Record<string, number> = {};

  constructor(private http: HttpClient) {
    this.loadCategoryMappings();
  }

  private _refreshNeeded$ = new Subject<void>();

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
    return this.http.get<any>(`${this.apiUrl}/${restaurantId}/search/`, { params: { q: categoryName } })
    .pipe(map((response) => response.categories));
  }
  
  addCategory(category: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${category.restaurantId}`, category).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }
}
