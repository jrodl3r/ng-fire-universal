import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/storage';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { NotifyService } from './notify.service';

import { IUser } from '../models/user';
import { IProfile } from '../models/user';

interface IUserData {
  avatar: string;
  displayName: string;
  email: string;
  profile: IProfile | null;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {
  data: Observable<IUserData | null>;
  doc: AngularFirestoreDocument;
  uploadTask: AngularFireUploadTask;
  storageRef: AngularFireStorageReference;
  isUpdating = false;
  isUploading = false;

  constructor(
    private auth: AuthService,
    private notify: NotifyService,
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {
    this.data = auth.user.pipe(
      map(user => user && user.active ? {
        avatar: user.photoURL,
        displayName: user.displayName || '',
        email: user.email,
        profile: user.profile || {} as IProfile
      } : null)
    );
  }

  public getUsers(): Observable<IUser[] | null> {
    return this.db.collection<IUser>('users').valueChanges();
  }

  public updateProfile(profile: IProfile) {
    this.isUpdating = true;
    this.doc = this.db.doc(`users/${this.auth.getUserID()}`);
    return this.doc.update({ profile })
      .then(() => this.notify.success('Successfully updated your profile'))
      .finally(() => this.isUpdating = false)
      .catch(error => this.notify.error(error));
  }

  public uploadAvatar(file: File, fileType: string, imageType: string) {
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
          this.doc = this.db.doc(`users/${this.auth.getUserID()}`);
          return this.doc.update({ photoURL })
            .then(() => this.notify.success('Successfully updated your avatar'))
            .finally(() => this.isUploading = false)
            .catch(error => this.notify.error(error));
        });
      })
    ).subscribe();
  }

}
