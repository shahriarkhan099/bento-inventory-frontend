import { Component, Input, OnInit } from '@angular/core';
import { ConsumptionLog } from '../../models/consumptionLog.model';
import { ConsumptionLogService } from '../../services/consumption-log/consumption-log.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrl: './order-history.component.css',
})

export class OrderHistoryComponent implements OnInit {

  editCache: { [key: number]: { edit: boolean; data: ConsumptionLog } } = {};
  checked = false;
  loading = false;
  indeterminate = false;
  ingredientData: ConsumptionLog[] = [];
  listOfCurrentPageData: readonly ConsumptionLog[] = [];
  setOfCheckedId = new Set<number>();

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onCurrentPageDataChange(listOfCurrentPageData: readonly ConsumptionLog[]): void {
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

  startEdit(id: number): void {
    if (this.editCache[id]) {
      this.editCache[id].edit = true;
    }
  }

  cancelEdit(id: number): void {
    this.editCache[id] = {
      data: { ...this.editCache[id].data },
      edit: false,
    };
  }

  saveEdit(id: number): void {
    const index = this.ingredientData.findIndex((item) => item.id === id);
    Object.assign(this.ingredientData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.ingredientData.forEach((item) => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }

  constructor(private consumptionLogService: ConsumptionLogService) {}

  @Input() restaurantId: number = 1;

  ngOnInit(): void {
    this.loadIngredients(1);
    this.updateEditCache();
  }

  private loadIngredients(restaurantId: number) {
    this.consumptionLogService.getConsumptionLog(restaurantId).subscribe({
      next: (data) => {
        this.ingredientData = data.map(ingredient => ({
          ...ingredient,
          consumedAt: new Date(ingredient.consumedAt).toLocaleString('en-US', {
            dateStyle: 'medium',
            timeStyle: 'medium',
          })
        }));
        console.log('Ingredient data loaded', this.ingredientData);
      },
      error: (error) => {
        console.error('Error fetching ingredient data', error);
      },
    });
  }

}
