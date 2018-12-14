import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    OverviewComponent
  ]
})
export class DashboardModule { }
