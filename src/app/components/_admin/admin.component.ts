import { Component } from '@angular/core';

import { SeoService } from '../../services/seo.service';

import { ITab } from '../../models/tab';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent {
  tabs: ITab[] = [
    { label: 'Dashboard', routerLink: '/admin', isExact: true },
    { label: 'Users', routerLink: '/admin/users' },
    { label: 'Products', routerLink: '/admin/products' },
    { label: 'Orders', routerLink: '/admin/orders' }
  ];

  constructor(private seo: SeoService) {
    this.seo.setMetaTags({
      title: 'ng-fire-universal » Admin',
      description: 'ng-fire-universal » Admin'
    });
  }

}
