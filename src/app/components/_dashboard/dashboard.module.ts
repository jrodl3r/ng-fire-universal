import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { NavModule } from '../_nav/nav.module';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NavModule
  ],
  declarations: [
    DashboardComponent,
    OverviewComponent,
    ProjectsComponent,
    ReportsComponent,
    ProfileComponent
  ]
})
export class DashboardModule { }
