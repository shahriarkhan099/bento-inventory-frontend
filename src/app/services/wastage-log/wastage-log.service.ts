import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { WasteLog } from '../../models/waste-log.model';

@Injectable({
  providedIn: 'root',
})
export class WastageLogService {
  private apiUrl = 'https://inventory-server-klzl.onrender.com/v1/wasteLog/restaurant';

  constructor(private http: HttpClient) {}

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  getAllWasteLogs(restaurantId: number): Observable<WasteLog[]> {
    return this.http
      .get<{ wasteLogs: WasteLog[] }>(
        `${this.apiUrl}/${restaurantId}`
      )
      .pipe(map((response) => response.wasteLogs));
  }

  addWasteLog(wasteLogs: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/${wasteLogs.restaurantId}`, wasteLogs).pipe(
      tap(() => {
        this._refreshNeeded$.next();
      })
    );
  }

  editWasteLog(wasteLogId: number, wasteLogs: any): Observable<void> {
    return this.http
      .put<void>(`${this.apiUrl}/${wasteLogId}`, wasteLogs)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }

  searchWasteLogByName(restaurantId: number, name: string): Observable<WasteLog> {
    return this.http
      .get<{ wasteLogs: WasteLog }>(
        `${this.apiUrl}/${restaurantId}/search/${name}`,
        { params: { searchTerm: name } }
      )
      .pipe(map((response) => response.wasteLogs));
  }
}
