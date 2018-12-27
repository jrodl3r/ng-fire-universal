import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../../services/auth.guard';

import { DashboardComponent } from './dashboard.component';
import { OverviewComponent } from './overview/overview.component';
import { ProjectsComponent } from './projects/projects.component';
import { ReportsComponent } from './reports/reports.component';

const routes: Routes = [
  { path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: OverviewComponent },
      { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
      { path: 'reports', component: ReportsComponent, canActivate: [AuthGuard] }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
