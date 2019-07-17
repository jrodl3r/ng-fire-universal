import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { PlatformService } from './platform.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private platform: PlatformService,
    private toastr: ToastrService
  ) { }

  info(msg: string) {
    if (this.platform.isBrowser()) {
      this.toastr.info(msg);
    }
    this.log(msg);
  }

  success(msg: string) {
    if (this.platform.isBrowser()) {
      this.toastr.success(msg);
    }
  }

  warn(msg: string) {
    if (this.platform.isBrowser()) {
      this.toastr.warning(msg);
    }
  }

  error(msg: string, err: string = '') {
    if (this.platform.isBrowser()) {
      this.toastr.error(msg);
    }
    console.error(err ? err : msg);
  }

  log(msg: string) { console.log(msg); }

}
