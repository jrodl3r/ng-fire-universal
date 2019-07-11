import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
// import { NavModule } from '../_nav/nav.module';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './users/users.component';
import { SettingsComponent } from './settings/settings.component';

// import { AdminService } from './admin.service';

// import { SortUsersPipe } from '../../services/pipes/sort-users.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    // ReactiveFormsModule,
    // FormsModule,
    // NavModule
  ],
  declarations: [
    AdminComponent,
    HomeComponent,
    SettingsComponent,
    UsersComponent
  ],
  // providers: [AdminService]
})
export class AdminModule { }
