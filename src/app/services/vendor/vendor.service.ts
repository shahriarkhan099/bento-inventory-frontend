import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
  private apiUrl = 'http://localhost:5000/v1';

  constructor(private http: HttpClient) { }

  getSuppliers(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/vendor`)
      .pipe(map((response) => response.data));
  }

  getVendorProducts(vendorId: number): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/vendor/${vendorId}`)
      .pipe(map((response) => response.data));
  }

  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/vendor`, supplier).pipe();
  }

  updateSupplier(supplier: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/vendor/${supplier.id}`, supplier).pipe();
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/order/vendor/${order.vendorId}/all`, order).pipe(
    );
  }

  searchVendorsByNameAndProducts(name: string): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/vendor/search/all/`, { params: { q: name } })
      .pipe(map((response) => response.data));
  }

  getVendorByIdWithProducts(vendorId: string): Observable<any> {
    return this.http.get<{ data: any }>(`${this.apiUrl}/vendor/${vendorId}/products`)
      .pipe(map((response) => response.data));
  }

  // Order Status with Vendor API
  getAllOrdersOfRestaurant(restaurantId: number): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.apiUrl}/order/restaurant/${restaurantId}`)
      .pipe(map((response) => response.data));
  }

}
