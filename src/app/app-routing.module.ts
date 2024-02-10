import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InventoryIngredientsComponent } from './pages/inventory-ingredients/inventory-ingredients.component';
import { OrderHistoryComponent } from './pages/order-history/order-history.component';
import { OrderSuggestionsComponent } from './pages/order-suggestions/order-suggestions.component';
import { TrackWastageComponent } from './pages/track-wastage/track-wastage.component';
import { PlaceOrdersComponent } from './pages/place-orders/place-orders.component';
import { OrderStatusComponent } from './pages/order-status/order-status.component';
import { SupplierListComponent } from './pages/supplier-list/supplier-list.component';
import { DeliveryBoxesComponent } from './pages/delivery-boxes/delivery-boxes.component';
import { AuthRedirectComponent } from './auth-redirect/auth-redirect.component';

const routes: Routes = [
  { path: 'auth-redirect', component: AuthRedirectComponent },
  //Manage Ingredients Pages
  { path: 'inventory-ingredients', component: InventoryIngredientsComponent },
  { path: 'order-suggestions', component: OrderSuggestionsComponent },
  { path: 'track-wastage', component: TrackWastageComponent },
  { path: 'delivery-boxes', component: DeliveryBoxesComponent },

  //Manage Orders Pages
  { path: 'place-orders', component: PlaceOrdersComponent },
  { path: 'order-history', component: OrderHistoryComponent },
  { path: 'order-status', component: OrderStatusComponent },

  //Manage Supplier Pages
  { path: 'supplier-list', component: SupplierListComponent },

  //Default Dashboard  Pages
  {
    path: 'inventory-ingredients',
    pathMatch: 'full',
    component: InventoryIngredientsComponent,
  },
  { path: '', redirectTo: 'inventory-ingredients', pathMatch: 'full' },
  { path: '**', redirectTo: 'inventory-ingredients', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
