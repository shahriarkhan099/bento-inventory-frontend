import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.prod';
import { map } from 'rxjs/operators';
import { ConsumptionLog } from '../../models/consumptionLog.model';

@Injectable({
  providedIn: 'root'
})

export class ConsumptionLogService {
  // private apiUrl = environment.apiUrl;
  private apiUrl = 'http://localhost:4000/v1';

  constructor(private http: HttpClient) {}

  getConsumptionLog(restaurantId: number): Observable<ConsumptionLog[]> {
    return this.http
      .get<{ consumptionLogs: ConsumptionLog[] }>(
        `${this.apiUrl}/consumptionLog/restaurant/${restaurantId}`
      )
      .pipe(map((response) => response.consumptionLogs));
  }

}
