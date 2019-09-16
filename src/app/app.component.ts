import { Component, OnInit } from '@angular/core';

import { AuthService } from './services/auth.service';
import { NavService } from './services/nav.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public auth: AuthService,
    public nav: NavService
  ) { }

  ngOnInit() {
    this.auth.redirectAfterSignIn();
  }

}
