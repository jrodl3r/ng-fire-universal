import { Component, OnInit } from '@angular/core';

import { fadeAnimation } from '../../app.animation';

import { ITab } from '../../models/tab';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  animations: [fadeAnimation]
})
export class AdminComponent implements OnInit {
  tabs: ITab[] = [
    { label: 'Dashboard', routerLink: '/admin' },
    { label: 'Users', routerLink: '/admin/users' },
    { label: 'Orders', routerLink: '/admin/orders' },
    { label: 'Products', routerLink: '/admin/products' },
  ];

  constructor() { }

  ngOnInit() { }

}
