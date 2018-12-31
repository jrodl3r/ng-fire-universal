import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';

import { ITabs } from '../../models/tabs';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  tabs: ITabs[] = [
    { label: 'Profile', routerLink: '/dashboard' },
    { label: 'Projects', routerLink: '/dashboard/projects' },
    { label: 'Reports', routerLink: '/dashboard/reports' }
  ];
  user: IUser;
  userSub: Subscription;

  constructor(
    public auth: AuthService,
    public system: SystemService
  ) { }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      if (user) {
        this.user = user;
      }
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

}
