import { Component } from '@angular/core';

import { SeoService } from '../../services/seo.service';

import { ITab } from '../../models/tab';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {
  tabs: ITab[] = [
    { label: 'Home', routerLink: '/user', isExact: true },
    { label: 'My Profile', routerLink: '/user/profile' },
    { label: 'My Orders', routerLink: '/user/orders' }
  ];

  constructor(private seo: SeoService) {
    this.seo.setMetaTags({
      title: 'My Account',
      description: 'My Account'
    });
  }

}
