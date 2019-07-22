import { Component } from '@angular/core';

import { ITab } from '../../models/tab';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  tabs: ITab[] = [
    { label: 'Dashboard', routerLink: '/admin' },
    { label: 'Users', routerLink: '/admin/users' },
    { label: 'Products', routerLink: '/admin/products' },
    { label: 'Orders', routerLink: '/admin/orders' }
  ];
}
