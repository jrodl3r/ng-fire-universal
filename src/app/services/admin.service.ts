import { Injectable } from '@angular/core';
// import { AngularFireFunctions } from '@angular/fire/functions';

// import { AuthService } from 'src/app/services/auth.service';
// import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    // private auth: AuthService,
    // private notify: NotifyService,
    // private afFunctions: AngularFireFunctions
  ) { }

  // public setAdmin(state) {
  //   const call = this.afFunctions.httpsCallable(state ? 'addAdmin' : 'removeAdmin');
  //   const email = this.auth.getUserEmail();
  //   call({ email }).subscribe(
  //     status => this.notify.info(`${status.message} (You must sign-out before this takes effect)`),
  //     error => this.notify.error(`Error ${state ? 'adding' : 'removing'} admin`, error)
  //   );
  // }

}
