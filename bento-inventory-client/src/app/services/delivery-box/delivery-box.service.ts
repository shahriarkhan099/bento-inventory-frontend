import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DeliveryBox } from '../../models/delivery-box.model';

@Injectable({
  providedIn: 'root',
})
export class DeliveryBoxService {
  private apiUrl = 'http://localhost:4000/v1/deliveryBox/restaurant';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getDeliveryBoxes(restaurantId: number): Observable<DeliveryBox[]> {
    return this.http
      .get<{ deliveryBoxes: DeliveryBox[] }>(`${this.apiUrl}/${restaurantId}`)
      .pipe(map((response) => response.deliveryBoxes));
  }

  addDeliveryBox(deliveryBox: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${deliveryBox.restaurantId}`, deliveryBox).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editDeliveryBox(deliveryBoxId: number, deliveryBox: any): Observable<any> {
    return this.http
      .put<void>(`${this.apiUrl}/${deliveryBoxId}`, deliveryBox)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteDeliveryBox(deliveryBoxId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${deliveryBoxId}`);
  }

  searchDeliveryBoxByName(restaurantId: number, name: string): Observable<DeliveryBox> {
    return this.http
      .get<{ deliveryBox: DeliveryBox }>(
        `${this.apiUrl}/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.deliveryBox));
  }
}
