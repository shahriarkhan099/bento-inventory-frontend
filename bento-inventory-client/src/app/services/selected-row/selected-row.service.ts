import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SelectedRowService {

  private selectedRowSubject = new BehaviorSubject<any>(null);
  selectedRow$ = this.selectedRowSubject.asObservable();

  constructor() { }
  
  setSelectedRow(row: any) {
    this.selectedRowSubject.next(row);
  }
}
