import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Supplier } from '../../models/supplier.model';

@Injectable({
  providedIn: 'root',
})
export class SupplierListService {
  private apiUrl = 'http://localhost:4000/v1/supplier/restaurant';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getSuppliers(restaurantId: number): Observable<Supplier[]> {
    return this.http
      .get<{ suppliers: Supplier[] }>(
        `${this.apiUrl}/${restaurantId}`
      )
      .pipe(map((response) => response.suppliers));
  }
  
  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${supplier.restaurantId}`, supplier).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editSupplier(supplierId: number, supplier: any): Observable<any> {
    return this.http
      .put<void>(`${this.apiUrl}/${supplierId}`, supplier)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteSupplier(supplierId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${supplierId}`);
  }

  searchSupplierByName(restaurantId: number, name: string): Observable<Supplier> {
    return this.http
      .get<{ supplier: Supplier }>(
        `${this.apiUrl}/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.supplier));
  }
}
