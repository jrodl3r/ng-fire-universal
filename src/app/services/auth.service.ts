import { Injectable, Inject, forwardRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { auth } from 'firebase/app';
import { Observable, BehaviorSubject, of } from 'rxjs';
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
  isLoading = new BehaviorSubject<boolean>(false);
  isAdmin = false;

  constructor(
    @Inject(forwardRef(() => PlatformService)) private platform: PlatformService,
    private notify: NotifyService,
    private router: Router,
    private zone: NgZone,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private afFunctions: AngularFireFunctions
  ) {
    this.isLoading.next(true);
    this.user = platform.isBrowser() && afAuth ? afAuth.authState.pipe(
      switchMap(user => {
        this.isLoading.next(false);
        if (user) {
          user.getIdTokenResult().then(idTokenResult => // Check claims
            this.isAdmin = idTokenResult.claims.admin ? true : false);
          return this.db.doc<IUser>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
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
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(credential => this.updateUser(credential.user))
      .then(() => this.router.navigate(['/me']))
      .catch(error => this.notify.error(error));
  }

  public emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => this.updateUser(credential.user))
      .then(() => this.router.navigate(['/me']))
      .catch(error => this.notify.error(error));
  }

  public resetPassword(email: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => this.notify.success('Password reset email sent'))
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
          return this.userDoc.set(data);
        }
        this.userDoc.update({
          lastLogin: date,
          photoURL: user.photoURL
        });
      })
      .catch(error => this.notify.error('Error saving user account', error));
  }

  public logActivity() {
    this.userDoc = this.db.doc<IUser>(`users/${this.getUserID()}`);
    this.userDoc.ref.get()
      .then(user => {
        if (user.exists) {
          this.userDoc.update({ lastActive: new Date() });
        }
      })
      .catch(error => this.notify.error('Error logging user activity', error));
  }

  public signOut() {
    this.afAuth.auth.signOut().then(() => {
      if (this.platform.isBrowser) {
        sessionStorage.clear();
      }
    })
    .catch(error => this.notify.error('Error signing-out', error));
  }

  public isLoggedIn(): boolean {
    return this.afAuth ? this.afAuth.auth.currentUser !== null : false;
  }

  public getUserID(): string {
    return this.isLoggedIn() ? this.afAuth.auth.currentUser.uid : '';
  }

  public getUserEmail(): string {
    return this.isLoggedIn() ? this.afAuth.auth.currentUser.email : '';
  }

  /* ------------------------------------------------------------- */
  /* NOTE: This is currently the only way to set the custom claim  */
  /* for the root-admin - This will be removed after setting       */
  /* custom user claims from the CP or CLI is enabled.             */
  /* ------------------------------------------------------------- */
  /* TODO: Remove this function after initializing the root-admin. */
  /*       (Don't worry, this logic also exists in admin module)   */
  /*       See: `/docs/Setup_Root_Admin.md`                        */
  /* ------------------------------------------------------------- */
  public setAdmin(state) {
    const call = this.afFunctions.httpsCallable(state ? 'addAdmin' : 'removeAdmin');
    const email = this.getUserEmail();
    call({ email }).subscribe(
      status => this.notify.info(`${status.message} (You must sign-out before this takes effect)`),
      error => this.notify.error(`Error ${state ? 'adding' : 'removing'} admin`, error)
    );
  }

}
