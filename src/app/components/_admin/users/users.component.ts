import { Component } from '@angular/core';

import { AuthService } from './../../../services/auth.service';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  isModalActive = false;

  constructor(
    public auth: AuthService,
    public admin: AdminService) { }

  public showUserModal(uid: string) {
    this.admin.selectUser(uid);
    this.isModalActive = true;
  }

  public hideUserModal(event: Event) {
    event.stopPropagation();
    setTimeout(() => {
      this.admin.selectUser(null);
      this.isModalActive = false;
    }, 100);
  }

}
