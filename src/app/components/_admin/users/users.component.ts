import { Component } from '@angular/core';

import { AdminService } from '../../../services/admin.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  isModalActive = false;

  constructor(
    public admin: AdminService,
    public auth: AuthService
  ) { }

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
