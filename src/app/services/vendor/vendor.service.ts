import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  getVendorApiUrl(): string {
    return this.configService.getVendorApiUrl();
  }

  getSuppliers(): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.getVendorApiUrl()}/v1/vendor`)
      .pipe(map((response) => response.data));
  }

  getVendorProducts(vendorId: number): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.getVendorApiUrl()}/v1/vendor/${vendorId}`)
      .pipe(map((response) => response.data));
  }

  addSupplier(supplier: any): Observable<any> {
    return this.http.post(`${this.getVendorApiUrl()}/v1/vendor`, supplier).pipe();
  }

  updateSupplier(supplier: any): Observable<any> {
    return this.http.put(`${this.getVendorApiUrl()}/v1/vendor/${supplier.id}`, supplier).pipe();
  }

  placeOrder(order: any): Observable<any> {
    return this.http.post(`${this.getVendorApiUrl()}/v1/order/vendor/${order.vendorId}/all`, order).pipe(
    );
  }

  searchVendorsByNameAndProducts(name: string): Observable<any> {
    return this.http.get<{ data: any }>(`${this.getVendorApiUrl()}/v1/vendor/search/all/`, { params: { q: name } })
      .pipe(map((response) => response.data));
  }

  getVendorByIdWithProducts(vendorId: string): Observable<any> {
    return this.http.get<{ data: any }>(`${this.getVendorApiUrl()}/v1/vendor/${vendorId}/products`)
      .pipe(map((response) => response.data));
  }

  // Order Status with Vendor API
  getAllOrdersOfRestaurant(restaurantId: number): Observable<any[]> {
    return this.http.get<{ data: any[] }>(`${this.getVendorApiUrl()}/v1/order/restaurant/${restaurantId}`)
      .pipe(map((response) => response.data));
  }

}
