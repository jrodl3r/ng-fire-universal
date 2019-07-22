import { Injectable, Inject, forwardRef } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFireAuth } from '@angular/fire/auth';
import { finalize, tap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

import { IProfile } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  avatar: string;
  email: string;
  fname: string;
  profile: IProfile;
  userDoc: AngularFirestoreDocument;
  uploadTask: AngularFireUploadTask;
  storageRef: AngularFireStorageReference;
  isLoading = false;
  isUpdating = false;
  isUploading = false;

  constructor(
    @Inject(forwardRef(() => AuthService)) private auth: AuthService,
    private notify: NotifyService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private storage: AngularFireStorage
  ) {
    this.afAuth.auth.onIdTokenChanged(() => this.clearProfile());
    if (auth.user) {
      this.isLoading = true;
      auth.user.pipe(tap(user => {
        if (user && user.active) {
          this.avatar = user.photoURL;
          this.profile = user.profile ? user.profile : null;
          this.fname = user.profile && user.profile.fname
            ? user.profile.fname
            : auth.getUserName('first');
          this.email = auth.getUserEmail();
          this.isLoading = false;
        }
      })).subscribe();
    }
  }

  public updateProfile(profile: IProfile) {
    this.isUpdating = true;
    this.userDoc = this.userDoc || this.db.doc(`users/${this.auth.getUserID()}`);
    return this.userDoc.update({ profile })
      .then(() => this.notify.success('Successfully updated your profile'))
      .finally(() => this.isUpdating = false)
      .catch(error => this.notify.error(error));
  }

  public updateAvatar(file: File, fileType: string, imageType: string) {
    const path = `images/avatars/${this.auth.getUserID()}`;
    const customMetadata = { user: this.auth.getUserID() };
    // Only allow .png or .jpg images
    if (fileType !== 'image' || !imageType.match(/^(png|jpeg)$/)) {
      this.notify.warn('Image can be PNG or JPEG');
      return;
    } else if (file.size > 300 * 1024) { // Less than 300KB
      this.notify.warn('Image must be less than 300KB');
      return;
    }
    this.isUploading = true;
    this.storageRef = this.storage.ref(path);
    this.uploadTask = this.storage.upload(path, file, { customMetadata });
    this.uploadTask.snapshotChanges().pipe(
      finalize(() => {
        this.storageRef.getDownloadURL().subscribe(photoURL => {
          this.userDoc = this.userDoc || this.db.doc(`users/${this.auth.getUserID()}`);
          return this.userDoc.update({ photoURL })
            .then(() => this.notify.success('Successfully updated your avatar'))
            .finally(() => this.isUploading = false)
            .catch(error => this.notify.error(error));
        });
      })
    ).subscribe();
  }

  private clearProfile() {
    this.avatar = this.email = this.fname = '';
    this.profile = null;
  }

  // public logActivity() {
  //   this.userDoc = this.db.doc<IUser>(`users/${this.getUserID()}`);
  //   this.userDoc.ref.get()
  //     .then(user => {
  //       if (user.exists) {
  //         this.userDoc.update({ lastActive: new Date() });
  //       }
  //     })
  //     .catch(error => this.notify.error('Error logging user activity', error));
  // }

}
