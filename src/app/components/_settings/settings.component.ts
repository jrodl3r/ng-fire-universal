import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../../services/auth.service';

import { ITabs } from '../../models/tabs';
import { IUser } from '../../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  tabs: ITabs[] = [
    { label: 'My Profile', routerLink: '/settings/profile' },
    { label: 'My Account', routerLink: '/settings/account' },
    { label: 'Dashboard', routerLink: '/settings/dashboard' }
  ];
  user: IUser;
  userSub: Subscription;

  constructor(public auth: AuthService) { }

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
