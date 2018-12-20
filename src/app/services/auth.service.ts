import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay, startWith, tap } from 'rxjs/operators';

import { SystemService } from './system.service';
import { IUser } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<IUser | null>;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private zone: NgZone,
    private system: SystemService
  ) {
    this.user = system.isBrowser() ? afAuth.authState.pipe(
      switchMap(user => user ? this.afs.doc<IUser>(`users/${user.uid}`).valueChanges() : of(null)),
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      shareReplay(1), // Cache user
      startWith(JSON.parse(localStorage.getItem('user')))
    ) : afAuth.authState;
  }

  // Save user credential
  private createUser(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc<IUser>(`users/${user.uid}`);
    return userRef.ref.get()
      .then(userDoc => {
        if (!userDoc.exists) {
          const data: IUser = {
            uid: user.uid,
            email: user.email,
            created: new Date()
          };
          return userRef.set(data);
        }
      });
  }

  // OAuth login
  private oAuthLogin(provider: any) {
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => this.createUser(credential.user))
      .then(() => this.zone.run(async () => await this.router.navigate(['/dashboard'])))
      .catch(error => this.system.error(error));
  }

  public googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    this.oAuthLogin(provider);
  }

  // Email login
  public emailLogin(email: string, password: string) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(() => this.router.navigate(['/dashboard']))
      .catch(error => this.system.error(error));
  }

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
        localStorage.clear();
      }
      this.router.navigate(['/login']);
    });
  }

  public isLoggedIn(): Boolean {
    if (this.system.isBrowser()) {
      return !!localStorage.getItem('user') && localStorage.getItem('user') !== 'null';
    }
    return this.afAuth.auth.currentUser !== null ? true : false;
  }

}
