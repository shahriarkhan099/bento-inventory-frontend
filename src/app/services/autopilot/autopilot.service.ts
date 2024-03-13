import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from '../config/config.service';

@Injectable({
  providedIn: 'root'
})
export class AutopilotService {

  constructor(private http: HttpClient, private configService: ConfigService) {}

  getAutopilotDataOfRestaurant(restaurantId: number) {
    return this.http.get(`${this.configService.getInventoryApiUrl()}/v1/autopilot/restaurant/${restaurantId}`);
  }

  updateAutopilotStatus(restaurantId: number, autopilotStatus: boolean) {
    console.log({restaurantId: restaurantId, autopilotStatus: autopilotStatus});
    
    return this.http.put(`${this.configService.getInventoryApiUrl()}/v1/autopilot/restaurant/${restaurantId}`, {restaurantId: restaurantId, autoPilotSwitch: autopilotStatus});
  }

  createAutopilotStatus(restaurantId: number, autopilotStatus: boolean) {
    return this.http.post(`${this.configService.getInventoryApiUrl()}/v1/autopilot/restaurant/${restaurantId}`, {restaurantId, autopilotStatus});
  }
}
