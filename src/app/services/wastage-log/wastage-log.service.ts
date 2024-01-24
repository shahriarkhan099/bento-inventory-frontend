import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WasteLog } from '../../models/waste-log.model';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root',
})
export class WastageLogService {

  private _refreshNeeded$ = new Subject<void>();

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getInventoryApiUrl(): string {
    return this.configService.getInventoryApiUrl();
  }

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAllWasteLogs(restaurantId: number): Observable<WasteLog[]> {
    return this.http
      .get<{ wasteLogs: WasteLog[] }>(
        `${this.getInventoryApiUrl()}/v1/wasteLog/restaurant/${restaurantId}`
      )
      .pipe(map((response) => response.wasteLogs));
  }

  addWasteLog(wasteLogs: any): Observable<any> {
    return this.http.post(`${this.getInventoryApiUrl()}/v1/wasteLog/restaurant/${wasteLogs.restaurantId}`, wasteLogs).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editWasteLog(wasteLogId: number, wasteLogs: any): Observable<void> {
    return this.http
      .put<void>(`${this.getInventoryApiUrl()}/v1/wasteLog/restaurant/${wasteLogId}`, wasteLogs)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  searchWasteLogByName(restaurantId: number, name: string): Observable<WasteLog> {
    return this.http
      .get<{ wasteLogs: WasteLog }>(
        `${this.getInventoryApiUrl()}/v1/wasteLog/restaurant/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.wasteLogs));
  }

}
