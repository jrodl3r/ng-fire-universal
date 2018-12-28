import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';

import { ITabs } from '../../models/tabs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  tabs: ITabs[] = [
    { label: 'Profile', routerLink: '/dashboard' },
    { label: 'Projects', routerLink: '/dashboard/projects' },
    { label: 'Reports', routerLink: '/dashboard/reports' }
  ];

  constructor(
    public auth: AuthService,
    public system: SystemService
  ) { }

}
