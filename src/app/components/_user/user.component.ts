import { Component } from '@angular/core';

import { ITab } from '../../models/tab';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  tabs: ITab[] = [
    { label: 'Home', routerLink: '/me', isExact: true },
    { label: 'My Profile', routerLink: '/me/profile' },
    { label: 'My Orders', routerLink: '/me/orders' }
  ];
}
