import { Component, OnInit } from '@angular/core';

import { fadeAnimation } from '../../app.animation';

import { ITab } from '../../models/tab';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  animations: [fadeAnimation]
})
export class UserComponent implements OnInit {
  tabs: ITab[] = [
    { label: 'Home', routerLink: '/me' },
    { label: 'My Profile', routerLink: '/me/profile' },
    { label: 'My Orders', routerLink: '/me/orders' }
  ];

  constructor() { }

  ngOnInit() { }

}
