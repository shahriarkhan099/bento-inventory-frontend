import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VendorDataService {
  private vendorsSubject = new BehaviorSubject<any[]>([]);
  vendors$ = this.vendorsSubject.asObservable();

  constructor() {}

  updateVendors(vendors: any[]) {
    this.vendorsSubject.next(vendors);
  }
}
