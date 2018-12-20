import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  public isBrowser = () => {
    return typeof window !== 'undefined';
  }

  notify(msg: String) { // TODO: Setup toastr notifications
    // if (this.isBrowser()) {
    //   toastr.info(msg);
    // }
    console.log(msg);
  }

  success(msg: String) {
    // if (this.isBrowser()) {
    //   toastr.success(msg);
    // }
    console.log(msg);
  }

  error(err: Error) {
    // if (this.isBrowser()) {
    //   toastr.error(err);
    // }
    console.error(err);
  }

  log(msg: String) {
    console.log(msg);
  }

}
