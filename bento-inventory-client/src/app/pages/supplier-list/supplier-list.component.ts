import { Component, Input, OnInit } from '@angular/core';
import { SupplierListService } from '../../services/supplier-list/supplier-list.service';
import { Supplier } from '../../models/supplier.model';


@Component({
  selector: 'app-supplier-list',
  templateUrl: './supplier-list.component.html',
  styleUrl: './supplier-list.component.css',
})
export class SupplierListComponent implements OnInit {
  checked = false;
  loading = false;
  indeterminate = false;
  ingredientData: Supplier[] = [];
  listOfCurrentPageData: readonly Supplier[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly Supplier[]): void {
    this.listOfCurrentPageData = listOfCurrentPageData;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    const listOfEnabledData = this.listOfCurrentPageData.filter(
      ({ disabled }) => !disabled
    );
    this.checked = listOfEnabledData.every(({ id }) =>
      this.setOfCheckedId.has(id)
    );
    this.indeterminate =
      listOfEnabledData.some(({ id }) => this.setOfCheckedId.has(id)) &&
      !this.checked;
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(checked: boolean): void {
    this.listOfCurrentPageData
      .filter(({ disabled }) => !disabled)
      .forEach(({ id }) => this.updateCheckedSet(id, checked));
    this.refreshCheckedStatus();
  }

  sendRequest(): void {
    this.loading = true;
    const requestData = this.ingredientData.filter((data) =>
      this.setOfCheckedId.has(data.id)
    );
    console.log(requestData);
    setTimeout(() => {
      this.setOfCheckedId.clear();
      this.refreshCheckedStatus();
      this.loading = false;
    }, 1000);
  }

  constructor(private supplierListService: SupplierListService) {}

  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.loadSupplierss(1);
  }

  private loadSupplierss(restaurantId: number) {
    this.supplierListService.getSuppliers(restaurantId).subscribe({
      next: (data) => {
        this.ingredientData = data.map((ingredient) => ({
          ...ingredient,
        }));
        console.log('Ingredient data loaded', this.ingredientData);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
      },
    });
  }
}
