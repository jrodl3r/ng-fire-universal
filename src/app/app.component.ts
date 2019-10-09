import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { NavService } from './services/nav.service';
import { PlatformService } from './services/platform.service';
import { SwService } from './services/sw.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public nav: NavService,
    public platform: PlatformService,
    public serviceWorker: SwService
  ) { }

  ngOnInit() {
    this.auth.redirectAfterSignIn();
  }

}
