import { Component, OnDestroy } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';

import { AuthService } from '../../../services/auth.service';
import { NotifyService } from '../../../services/notify.service';
import { UserService } from '../../../services/user.service';

import { IUser } from '../../../models/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnDestroy {
  users: IUser[];
  usersSub: Subscription;
  user: IUser;
  isModalActive = false;
  isUpdating = false;

  constructor(
    public auth: AuthService,
    private db: AngularFirestore,
    private notify: NotifyService,
    private functions: AngularFireFunctions,
    private userService: UserService
  ) {
    this.usersSub = this.userService.getUsers().pipe(
      tap(users => {
        if (users && users.length) {
          this.users = users;
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }

  loadUser(uid) {
    this.user = this.users.filter(user => user.uid === uid)[0];
  }

  public showModal(uid: string) {
    this.loadUser(uid);
    this.isModalActive = true;
  }

  public hideModal(event: Event) {
    event.stopPropagation();
    setTimeout(() => {
      this.loadUser(null);
      this.isModalActive = false;
    }, 100);
  }

  public setAdmin(uid: string, email: string, state: boolean) {
    const call = this.functions.httpsCallable(state ? 'addAdmin' : 'removeAdmin');
    this.isUpdating = true;
    call({ email }).subscribe(
      status => {
        const userDoc = this.db.doc(`users/${uid}`);
        return userDoc.update({ isAdmin: state })
          .then(() => {
            this.loadUser(uid);
            this.notify.success(`${status.message} (User must sign-out before change takes effect)`);
          })
          .finally(() => this.isUpdating = false)
          .catch(error => this.notify.error(error));
      },
      error => {
        this.notify.error(`Error ${state ? 'adding' : 'removing'} admin`, error);
        this.isUpdating = false;
      }
    );
  }

}
