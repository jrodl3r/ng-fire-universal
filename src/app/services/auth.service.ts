import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay, startWith, tap } from 'rxjs/operators';

import { SystemService } from './system.service';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser | null>;
  isLoading: Boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private zone: NgZone,
    private system: SystemService
  ) {
    this.user = system.isBrowser() ? afAuth.authState.pipe(
      switchMap(user => user ? this.afs.doc<IUser>(`users/${user.uid}`).valueChanges() : of(null)),
      tap(user => sessionStorage.setItem('user', JSON.stringify(user))),
      shareReplay(1), // Cache user
      startWith(() => {
        const user = sessionStorage.getItem('user');
        return user !== 'undefined' ? JSON.parse(user) : null;
      })
    ) : afAuth.authState;
  }

  // Save new user
  private createUser(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc<IUser>(`users/${user.uid}`);
    return userRef.ref.get()
      .then(userDoc => {
        if (!userDoc.exists) {
          const data: IUser = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName || '',
            created: new Date()
          };
          return userRef.set(data);
        }
      });
  }

  // OAuth login
  private oAuthLogin(provider: any) {
    if (this.system.isBrowser()) {
      sessionStorage.setItem('login-pending', '1');
      this.afAuth.auth
        .signInWithRedirect(provider)
        .catch(error => {
          sessionStorage.removeItem('login-pending');
          this.system.error(error);
        });
    }
  }

  // Redirect OAuth login
  public redirectAfterSignIn() {
    if (this.system.isBrowser() && sessionStorage.getItem('login-pending')) {
      this.isLoading = true;
      sessionStorage.removeItem('login-pending');
      this.afAuth.auth.getRedirectResult()
        .then(response => {
          if (response.user) {
            this.createUser(response.user);
            this.zone.run(async () => await this.router.navigate(['/dashboard']))
              .then(() => setTimeout(() => this.isLoading = false, 100));
          }
        })
        .catch(error => this.system.error(error));
    }
  }

  // Google login
  public googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    this.oAuthLogin(provider);
  }

  // Email login
  public emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(error => this.system.error(error));
  }

  // Email sign up
  public emailSignUp(email: string, password: string) {
    return this.afAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(credential => this.createUser(credential.user))
      .then(() => this.router.navigate(['/dashboard']))
      .catch(error => this.system.error(error));
  }

  // Send password reset email
  public resetPassword(email: string) {
    return this.afAuth.auth
      .sendPasswordResetEmail(email)
      .then(() => this.system.notify('Password reset email sent.'))
      .catch(error => this.system.error(error));
  }

  // Change password
  public updatePassword(password: string) {
    return this.afAuth.auth.currentUser
      .updatePassword(password)
      .then(() => this.system.success('Password changed successfully.'))
      .catch(error => this.system.error(error));
  }

  public logout() {
    this.afAuth.auth.signOut().then(() => {
      if (this.system.isBrowser) {
        sessionStorage.clear();
      }
      this.router.navigate(['/login']);
    });
  }

  public isLoggedIn(): Boolean {
    if (this.system.isBrowser()) {
      return !!sessionStorage.getItem('user') && sessionStorage.getItem('user') !== 'null';
    }
    return this.afAuth.auth.currentUser !== null ? true : false;
  }

}
