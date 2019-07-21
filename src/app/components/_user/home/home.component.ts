import { Component, Inject, forwardRef } from '@angular/core';

import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  constructor(
    @Inject(forwardRef(() => AuthService)) public auth: AuthService
  ) { }

}
