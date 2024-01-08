import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Supplier } from '../../models/supplier.model';

@Injectable({
  providedIn: 'root'
})
export class SupplierListService {
  private apiUrl = 'http://localhost:4000/v1/supplier/restaurant';

  constructor(private http: HttpClient) {}

  getSuppliers(restaurantId: number): Observable<Supplier[]> {
    return this.http
      .get<{ suppliers: Supplier[] }>(
        `${this.apiUrl}/${restaurantId}`
      )
      .pipe(map((response) => response.suppliers));
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/suppliers/${id}`);
  }

  editSupplier(
    supplierId: number,
    supplier: Supplier
  ): Observable<any> {
    return this.http.put<void>(
      `${this.apiUrl}/suppliers/${supplierId}`,
      supplier
    );
  }

  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/1`, supplier);
  }

  findSupplierById(supplierId: number): Observable<Supplier> {
    return this.http
      .get<{ supplier: Supplier }>(
        `${this.apiUrl}/suppliers/${supplierId}`
      )
      .pipe(map((response) => response.supplier));
  }
}
