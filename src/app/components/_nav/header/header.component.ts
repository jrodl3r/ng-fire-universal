import { Component, Inject, forwardRef } from '@angular/core';

import { PlatformService } from 'src/app/services/platform.service';
import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    @Inject(forwardRef(() => PlatformService)) public platform: PlatformService,
    @Inject(forwardRef(() => AuthService)) public auth: AuthService,
    @Inject(forwardRef(() => NavService)) public nav: NavService
  ) { }

  signOut() {
    this.nav.collapseHeader();
    this.auth.signOut();
  }

}
