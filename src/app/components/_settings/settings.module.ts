import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SettingsRoutingModule } from './settings-routing.module';
import { NavModule } from '../_nav/nav.module';

import { SettingsComponent } from './settings.component';
import { ProfileComponent } from './profile/profile.component';
import { AccountComponent } from './account/account.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AvatarUploadComponent } from './avatar-upload/avatar-upload.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SettingsRoutingModule,
    NavModule
  ],
  declarations: [
    SettingsComponent,
    ProfileComponent,
    AccountComponent,
    DashboardComponent,
    AvatarUploadComponent
  ]
})
export class SettingsModule { }
