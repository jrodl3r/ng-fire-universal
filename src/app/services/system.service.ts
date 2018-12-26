import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private toastr: ToastrService) { }

  public isBrowser = () => {
    return typeof window !== 'undefined';
  }

  public isOnline = () => {
    return this.isBrowser() ? navigator.onLine : true;
  }

  public notify(msg: string) {
    if (this.isBrowser()) {
      this.toastr.info(msg);
    }
    this.log(msg);
  }

  public success(msg: string) {
    if (this.isBrowser()) {
      this.toastr.success(msg);
    }
    this.log(msg);
  }

  public error(err: string) {
    if (this.isBrowser()) {
      this.toastr.error(err);
    }
    console.error(err);
  }

  public log(msg: string) {
    console.log(msg);
  }

}
