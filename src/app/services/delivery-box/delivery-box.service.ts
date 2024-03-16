import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { IDeliveryBox, IDeliveryBoxCreation, IDeliveryBoxWithoutId } from '../../models/deliveryBox.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class DeliveryBoxService {
  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getDeliveryBoxes(restaurantId: number): Observable<IDeliveryBox[]> {
    return this.http
      .get<{ deliveryBoxes: IDeliveryBox[] }>(
        `${this.configService.getInventoryApiUrl()}/v1/deliveryBox/restaurant/${restaurantId}`
      )
      .pipe(map((response) => response.deliveryBoxes));
  }

  addDeliveryBox(deliveryBox: any): Observable<void> {
    return this.http
      .post<void>(
        `${this.configService.getInventoryApiUrl()}/v1/deliveryBox/restaurant/${
          deliveryBox.restaurantId
        }`,
        deliveryBox
      )
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  editDeliveryBox(deliveryBoxId: number, deliveryBox: any): Observable<void> {
    return this.http
      .put<void>(
        `${this.configService.getInventoryApiUrl()}/v1/deliveryBox/restaurant/${deliveryBoxId}`,
        deliveryBox
      )
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  deleteDeliveryBox(deliveryBoxId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.configService.getInventoryApiUrl()}/v1/deliveryBox/restaurant/${deliveryBoxId}`
    );
  }

  searchDeliveryBoxByName(
    restaurantId: number,
    name: string
  ): Observable<IDeliveryBox> {
    return this.http
      .get<{ deliveryBox: IDeliveryBox }>(
        `${this.configService.getInventoryApiUrl()}/v1/deliveryBox/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.deliveryBox));
  }
}
