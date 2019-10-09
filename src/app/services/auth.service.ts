import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay, startWith, tap } from 'rxjs/operators';

import { PlatformService } from './platform.service';
import { NotifyService } from './notify.service';

import { IUser } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser | null>;
  userDoc: AngularFirestoreDocument<IUser>;

  constructor(
    private platform: PlatformService,
    private notify: NotifyService,
    private router: Router,
    private zone: NgZone,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    platform.loading(true);
    this.user = platform.isBrowser() && afAuth ? afAuth.authState.pipe(
      switchMap(user => {
        platform.loading(false);
        return user ? this.db.doc<IUser>(`users/${user.uid}`).valueChanges() : of(null);
      }),
      tap(user => sessionStorage.setItem('user', JSON.stringify(user))),
      shareReplay(1), // Cache user
      startWith(() => {
        const user = sessionStorage.getItem('user');
        return user !== 'undefined' ? JSON.parse(user) : null;
      })
    ) : afAuth ? afAuth.authState : null;
  }

  public googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    provider.setCustomParameters({ prompt: 'select_account' });
    this.oAuthLogin(provider);
  }

  private oAuthLogin(provider: any) {
    if (this.platform.isBrowser()) {
      sessionStorage.setItem('login-pending', '1');
      this.afAuth.auth
        .signInWithRedirect(provider)
        .catch(error => {
          sessionStorage.removeItem('login-pending');
          this.notify.error(error);
        });
    }
  }

  public redirectAfterSignIn() {
    if (this.platform.isBrowser() && sessionStorage.getItem('login-pending')) {
      sessionStorage.removeItem('login-pending');
      this.afAuth.auth.getRedirectResult()
        .then(response => {
          if (response.user) {
            this.updateUser(response.user);
            this.zone.run(async () => await this.router.navigate(['/me']));
          } else { this.notify.error('Error fetching user account'); }
        })
        .catch(error => this.notify.error(error));
    }
  }

  public emailLogin(email: string, password: string) {
    this.platform.loading(true);
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => this.updateUser(credential.user))
      .then(() => this.router.navigate(['/me']))
      .finally(() => this.platform.loading(false))
      .catch(error => this.notify.error(error));
  }

  public emailSignUp(email: string, password: string) {
    this.platform.loading(true);
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => this.updateUser(credential.user))
      .then(() => this.router.navigate(['/me']))
      .finally(() => this.platform.loading(false))
      .catch(error => this.notify.error(error));
  }

  private updateUser(user: IUser) {
    const date = new Date();
    this.userDoc = this.db.doc<IUser>(`users/${user.uid}`);
    this.userDoc.ref.get()
      .then(userRef => {
        if (!userRef.exists) {
          const data: IUser = {
            active: true,
            uid: user.uid,
            email: user.email,
            created: date,
            lastActive: date,
            lastLogin: date,
            displayName: user.displayName || '',
            photoURL: user.photoURL || ''
          };
          this.userDoc.set(data);
        } else {
          this.userDoc.update({ lastLogin: date });
        }
      })
      .catch(error => this.notify.error('Error saving user account', error));
  }

  public resetPassword(email: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.success('Password reset email sent'))
      .catch(error => this.notify.error(error));
  }

  public signOut() {
    this.afAuth.auth.signOut().then(() => {
      if (this.platform.isBrowser) {
        sessionStorage.removeItem('user');
        this.router.navigate(['/login']);
      }
    })
    .catch(error => this.notify.error('Error signing-out', error));
  }

  public isLoggedIn = (): boolean => this.afAuth ? this.afAuth.auth.currentUser !== null : false;

  public getUserID = (): string => this.isLoggedIn() ? this.afAuth.auth.currentUser.uid : '';

}
