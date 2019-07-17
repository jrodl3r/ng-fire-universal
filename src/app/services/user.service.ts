import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

import { IProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userDoc: AngularFirestoreDocument;

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private afs: AngularFirestore
  ) { }

  public updateProfile(profile: IProfile) {
    this.userDoc = this.userDoc || this.afs.doc(`users/${this.auth.getUserID()}`);
    return this.userDoc.update({ profile })
      .then(() => this.notify.success('Successfully updated your profile'))
      .catch(error => this.notify.error(error));
  }

}
