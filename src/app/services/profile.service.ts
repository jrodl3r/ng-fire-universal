import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

import { IUser, IProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  userDoc: AngularFirestoreDocument<IUser>;

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private afs: AngularFirestore
  ) { }

  updateProfile(profile: IProfile) {
    this.userDoc = this.userDoc || this.afs.doc(`users/${this.auth.getUserID()}`);
    return this.userDoc.ref.get()
      .then(userDoc => {
        const userData = userDoc.data();
        // Detect changes
        if (profile.company !== userData.profile.company
          || profile.fname !== userData.profile.fname
          || profile.lname !== userData.profile.lname
          || profile.website !== userData.profile.website) {
          return true;
        }
        this.notify.info('No changes were detected in your profile.');
        return false;
      })
      .then(hasUpdates => {
        if (hasUpdates) {
          return this.userDoc.update({ profile })
            .then(() => this.notify.success('Successfully updated your profile.'));
        }
      })
      .catch(error => this.notify.error(error));
  }

  updateAvatar(avatar: string) {
    this.userDoc = this.userDoc || this.afs.doc(`users/${this.auth.getUserID()}`);
    return this.userDoc.update({ avatar })
      .then(() => this.notify.success('Successfully updated your avatar.'))
      .catch(error => this.notify.error(error));
  }

}
