import { Component } from '@angular/core';

import { ITabs } from '../../models/tabs';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent {
  tabs: ITabs[] = [
    { label: 'My Profile', routerLink: '/settings/profile' },
    { label: 'My Account', routerLink: '/settings/account' },
    { label: 'Dashboard', routerLink: '/settings/dashboard' }
  ];

  constructor() { }

}
