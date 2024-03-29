import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ISupplier } from '../../models/supplier.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class SupplierListService {

  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getSuppliers(restaurantId: number): Observable<ISupplier[]> {
    return this.http
      .get<{ suppliers: ISupplier[] }>(
        `${this.configService.getInventoryApiUrl()}/v1/supplier/restaurant/${restaurantId}`
      )
      .pipe(map((response) => response.suppliers));
  }
  
  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.configService.getInventoryApiUrl()}/v1/supplier/restaurant/${supplier.restaurantId}`, supplier).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editSupplier(supplierId: number, supplier: any): Observable<any> {
    return this.http
      .put<void>(`${this.configService.getInventoryApiUrl()}/v1/supplier/restaurant/${supplierId}`, supplier)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteSupplier(supplierId: number): Observable<void> {
    return this.http.delete<void>(`${this.configService.getInventoryApiUrl()}/v1/supplier/restaurant/${supplierId}`);
  }

  searchSupplierByName(restaurantId: number, name: string): Observable<ISupplier> {
    return this.http
      .get<{ supplier: ISupplier }>(
        `${this.configService.getInventoryApiUrl()}/v1/supplier/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.supplier));
  }

}
