import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  /* ------------------------------------------------------------- */
  /* NOTE: This is currently the only way to set the custom claim  */
  /* for the root-admin - This will be removed after setting       */
  /* custom user claims from the CP or CLI is enabled.             */
  /* ------------------------------------------------------------- */
  /* TODO: Remove this function after initializing the root-admin. */
  /*       (Don't worry, this logic also exists in admin module)   */
  /*       See: `/docs/Setup_Root_Admin.md`                        */
  /* ------------------------------------------------------------- */
  // public setAdmin(state) {
  //   const call = this.afFunctions.httpsCallable(state ? 'addAdmin' : 'removeAdmin');
  //   const email = this.getUserEmail();
  //   call({ email }).subscribe(
  //     status => this.notify.info(`${status.message} (You must sign-out before this takes effect)`),
  //     error => this.notify.error(`Error ${state ? 'adding' : 'removing'} admin`, error)
  //   );
  // }
}
