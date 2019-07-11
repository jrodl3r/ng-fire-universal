import { Component, Inject, forwardRef } from '@angular/core';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent {

  constructor(
    @Inject(forwardRef(() => AuthService)) public auth: AuthService
  ) { }

}
