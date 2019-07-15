import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { NavModule } from '../_nav/nav.module';

import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';

import { UserService } from './user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    NavModule
  ],
  declarations: [
    UserComponent,
    HomeComponent,
    OrdersComponent,
    ProfileComponent
  ],
  providers: [UserService]
})
export class UserModule { }
