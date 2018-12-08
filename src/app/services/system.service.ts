import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor() { }

  public isBrowser = () => {
    return typeof window !== 'undefined';
  }

  error(error: Error) {
    // system.logItem(error);
    // toastr.error(error.message); // TODO: replace
    console.error(error);
  }

  log(msg: String) {
    // system.logItem(error);
    // toastr.error(error.message); // TODO: replace
    console.log(msg);
  }

  // logItem(item) { // TODO: Setup Cloud Logging
  //
  // }
}
