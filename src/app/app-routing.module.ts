import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryIngredientsComponent } from './pages/inventory-ingredients/inventory-ingredients.component';
import { HomeComponent } from './component/home/home.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderSuggestionsComponent } from './pages/order-suggestions/order-suggestions.component';
import { TrackWastageComponent } from './pages/track-wastage/track-wastage.component';
import { PlaceOrdersComponent } from './pages/place-orders/place-orders.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { ScheduleOrderComponent } from './pages/schedule-order/schedule-order.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { OnPlatformSupplierComponent } from './pages/on-platform-supplier/on-platform-supplier.component';
import { DeliveryBoxesComponent } from './pages/delivery-boxes/delivery-boxes.component';

const routes: Routes = [
  //Manage Ingredients Pages
  { path: 'inventory-ingredients', component: InventoryIngredientsComponent },
  { path: 'order-suggestions', component: OrderSuggestionsComponent },
  { path: 'track-wastage', component: TrackWastageComponent },
  { path: 'delivery-boxes', component: DeliveryBoxesComponent },

  //Manage Orders Pages
  { path: 'place-orders', component: PlaceOrdersComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'order-status', component: OrderStatusComponent },
  { path: 'schedule-order', component: ScheduleOrderComponent },

  //Manage Supplier Pages
  { path: 'supplier-list', component: SupplierListComponent },
  { path: 'on-platform-suppliers', component: OnPlatformSupplierComponent },

  //Default Dashboard  Pages
  { path: 'home', pathMatch: 'full', component: HomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}