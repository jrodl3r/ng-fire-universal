import { Component, OnInit, Inject, forwardRef } from '@angular/core';

import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    @Inject(forwardRef(() => AuthService)) public auth: AuthService
  ) { }

  ngOnInit() {
    if (this.auth) {
      this.auth.redirectAfterSignIn();
    }
  }

}
