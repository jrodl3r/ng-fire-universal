import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { NavModule } from '../_nav/nav.module';

import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { CartSummaryComponent } from './home/cart-summary/cart-summary.component';
import { EditAvatarComponent } from './profile/edit-avatar/edit-avatar.component';
import { UserProfileComponent } from './home/user-profile/user-profile.component';
import { RecentOrdersComponent } from './home/recent-orders/recent-orders.component';

import { UserService } from '../../services/user.service';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NavModule
  ],
  declarations: [
    UserComponent,
    HomeComponent,
    OrdersComponent,
    ProfileComponent,
    CartSummaryComponent,
    EditAvatarComponent,
    UserProfileComponent,
    RecentOrdersComponent
  ],
  providers: [UserService]
})
export class UserModule { }
