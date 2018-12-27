import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';
import { ProfileComponent } from './profile/profile.component';
import { TabsComponent } from './tabs/tabs.component';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule
  ],
  declarations: [
    DashboardComponent,
    OverviewComponent,
    ProjectsComponent,
    ReportsComponent,
    ProfileComponent,
    TabsComponent
  ]
})
export class DashboardModule { }
