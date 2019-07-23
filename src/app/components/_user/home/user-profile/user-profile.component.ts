import { Component, Inject, forwardRef } from '@angular/core';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent {

  constructor(
    @Inject(forwardRef(() => UserService)) public user: UserService
  ) { }

}
