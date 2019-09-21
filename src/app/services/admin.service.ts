import { Injectable, OnDestroy } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Subscription } from 'rxjs';

import { NotifyService } from './notify.service';

import { IUser } from '../models/user';

@Injectable()
export class AdminService implements OnDestroy {
  userListCollection: AngularFirestoreCollection<IUser>;
  userListSub: Subscription;
  userList: Array<IUser>;
  selectedUser: IUser;
  isUpdatingUser = false;
  isLoading = false;

  constructor(
    private notify: NotifyService,
    private db: AngularFirestore,
    private afFunctions: AngularFireFunctions
  ) {
    this.isLoading = true;
    this.selectedUser = null;
    this.userListCollection = this.db.collection<IUser>('users');
    this.userListSub = this.userListCollection.valueChanges()
      .subscribe(users => {
        this.userList = users && users.length ? users : [];
        this.isLoading = false;
      },
      error => (() => {
        this.notify.error('Error fetching users', error);
        this.isLoading = false;
      }));
  }

  ngOnDestroy() {
    this.userListSub.unsubscribe();
  }

  public selectUser(uid) {
    this.selectedUser = uid ? this.userList.filter(user => user.uid === uid)[0] : null;
  }

  public setUserAdminState(uid: string, email: string, state: boolean) {
    const call = this.afFunctions.httpsCallable(state ? 'addAdmin' : 'removeAdmin');
    this.isUpdatingUser = true;
    call({ email }).subscribe(
      status => {
        const userDoc = this.db.doc(`users/${uid}`);
        return userDoc.update({ isAdmin: state })
          .then(() => {
            this.selectedUser.isAdmin = state;
            this.notify.success(`${status.message} (User must sign-out before change takes effect)`);
          })
          .finally(() => this.isUpdatingUser = false)
          .catch(error => this.notify.error(error));
      },
      error => {
        this.notify.error(`Error ${state ? 'adding' : 'removing'} admin`, error);
        this.isUpdatingUser = false;
      });
  }

}
