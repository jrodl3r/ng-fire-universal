import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { NavModule } from '../_nav/nav.module';
import { SharedModule } from '../../shared/shared.module';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProductsComponent } from './products/products.component';
import { UsersComponent } from './users/users.component';
import { UserDetailComponent } from './users/user-detail/user-detail.component';

import { SortUsersPipe } from '../../services/pipes/sort-users.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    NavModule,
    SharedModule
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    OrdersComponent,
    ProductsComponent,
    UsersComponent,
    UserDetailComponent,
    SortUsersPipe
  ]
})
export class AdminModule { }
