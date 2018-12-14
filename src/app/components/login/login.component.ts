import { Component } from '@angular/core';

import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    public auth: AuthService,
    public system: SystemService
  ) { }

}
