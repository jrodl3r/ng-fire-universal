import { Component } from '@angular/core';

import { AuthService } from '../../../services/auth.service';
import { SystemService } from '../../../services/system.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isMenuExpanded: Boolean = false;
  isAccountMenuExpanded: Boolean = false;

  constructor(
    public auth: AuthService,
    public system: SystemService
  ) { }

  toggleMenu() {
    this.isMenuExpanded = !this.isMenuExpanded;
  }

  toggleAccountMenu() {
    this.isAccountMenuExpanded = !this.isAccountMenuExpanded;
  }

  logout(event) {
    event.preventDefault();
    this.auth.logout();
  }
}
