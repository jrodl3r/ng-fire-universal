import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(
    private system: SystemService,
    private toastr: ToastrService
  ) { }

  info(msg: string) {
    if (this.system.isBrowser()) {
      this.toastr.info(msg);
    }
    this.log(msg);
  }

  success(msg: string) {
    if (this.system.isBrowser()) {
      this.toastr.success(msg);
    }
    this.log(msg);
  }

  error(err: string) {
    if (this.system.isBrowser()) {
      this.toastr.error(err);
    }
    console.error(err);
  }

  log(msg: string) {
    console.log(msg);
  }
}
