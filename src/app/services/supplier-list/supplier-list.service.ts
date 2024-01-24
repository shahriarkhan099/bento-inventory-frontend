import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Supplier } from '../../models/supplier.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierListService {

  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getInventoryApiUrl(): string {
    return this.configService.getInventoryApiUrl();
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getSuppliers(restaurantId: number): Observable<Supplier[]> {
    return this.http
      .get<{ suppliers: Supplier[] }>(
        `${this.getInventoryApiUrl()}/v1/supplier/restaurant/${restaurantId}`
      )
      .pipe(map((response) => response.suppliers));
  }
  
  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.getInventoryApiUrl()}/v1/supplier/restaurant/${supplier.restaurantId}`, supplier).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editSupplier(supplierId: number, supplier: any): Observable<any> {
    return this.http
      .put<void>(`${this.getInventoryApiUrl()}/v1/supplier/restaurant/${supplierId}`, supplier)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteSupplier(supplierId: number): Observable<void> {
    return this.http.delete<void>(`${this.getInventoryApiUrl()}/v1/supplier/restaurant/${supplierId}`);
  }

  searchSupplierByName(restaurantId: number, name: string): Observable<Supplier> {
    return this.http
      .get<{ supplier: Supplier }>(
        `${this.getInventoryApiUrl()}/v1/supplier/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.supplier));
  }

}
