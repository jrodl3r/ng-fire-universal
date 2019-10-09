import { Component } from '@angular/core';

import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { PlatformService } from 'src/app/services/platform.service';
import { SwService } from 'src/app/services/sw.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(
    public auth: AuthService,
    public nav: NavService,
    public platform: PlatformService,
    public serviceWorker: SwService
  ) { }

  reload() {
    if (this.platform.isBrowser()) {
      document.location.reload();
    }
  }

  signOut() {
    this.nav.closeMenu();
    this.auth.signOut();
  }

}
