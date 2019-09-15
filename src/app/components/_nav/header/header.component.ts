import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

import { AuthService } from 'src/app/services/auth.service';
import { NavService } from 'src/app/services/nav.service';
import { PlatformService } from 'src/app/services/platform.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  hasUpdates = false;

  constructor(
    public auth: AuthService,
    public nav: NavService,
    public platform: PlatformService,
    private swUpdates: SwUpdate
  ) { }

  ngOnInit() {
    if (this.platform.isBrowser()) {
      this.swUpdates.available.subscribe(event =>
        this.swUpdates.activateUpdate().then(() => this.hasUpdates = true));
    }
  }

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
