import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutingModule } from './user-routing.module';
import { NavModule } from '../_nav/nav.module';

import { UserComponent } from './user.component';
import { HomeComponent } from './home/home.component';
import { OrdersComponent } from './orders/orders.component';
import { ProfileComponent } from './profile/profile.component';
import { EditAvatarComponent } from './profile/edit-avatar/edit-avatar.component';

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
    EditAvatarComponent
  ],
  providers: [UserService]
})
export class UserModule { }
