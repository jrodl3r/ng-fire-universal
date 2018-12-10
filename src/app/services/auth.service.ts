import { Injectable } from '@angular/core';
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
  user: Observable<IUser>;
  isReady: Boolean = false;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,
    private system: SystemService
  ) {
    this.user = system.isBrowser() ? afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<IUser>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      }),
      tap(user => localStorage.setItem('user', JSON.stringify(user))),
      shareReplay(1), // Cache user
      startWith(JSON.parse(localStorage.getItem('user')))
    ) : afAuth.authState;
    this.isReady = true;
  }

  // Get / Create user
  private loadUser(user: IUser) {
    const userRef: AngularFirestoreDocument<IUser> = this.afs.doc<IUser>(`users/${user.uid}`);
    return userRef.ref.get()
      .then(userDoc => {
        if (!userDoc.exists) {
          const data: IUser = {
            uid: user.uid,
            email: user.email
          };
          return userRef.set(data);
        }
      });
  }

  // OAuth login
  private oAuthLogin(provider: any) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(credential => this.loadUser(credential.user))
      .then(() => this.router.navigate(['/dashboard']))
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
      .then(credential => this.loadUser(credential.user))
      .then(() => this.router.navigate(['/dashboard']))
      .catch(error => this.system.error(error));
  }

  public isLoggedIn(): Boolean {
    if (this.system.isBrowser()) {
      return localStorage.getItem('user') !== 'null' && !!localStorage.getItem('user');
    }
    return this.afAuth.auth.currentUser !== null ? !!this.afAuth.auth.currentUser.uid : false;
  }

  public logout() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
      if (this.system.isBrowser) {
        localStorage.clear();
      }
    });
  }
}
