import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavModule } from '../_nav/nav.module';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';

import { SortUsersPipe } from '../../services/pipes/sort-users.pipe';

import { AdminService } from '../../services/admin.service';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavModule
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    SortUsersPipe
  ],
  providers: [AdminService]
})
export class AdminModule { }
