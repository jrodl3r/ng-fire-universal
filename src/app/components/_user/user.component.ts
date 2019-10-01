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
    { label: 'Home', routerLink: '/me', isExact: true },
    { label: 'My Profile', routerLink: '/me/profile' },
    { label: 'My Orders', routerLink: '/me/orders' }
  ];

  constructor(private seo: SeoService) {
    this.seo.setMetaTags({
      title: 'ng-fire-universal » My Account',
      description: 'ng-fire-universal » My Account'
    });
  }

}
