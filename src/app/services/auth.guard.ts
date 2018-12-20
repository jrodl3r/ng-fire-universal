import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { SystemService } from './system.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private system: SystemService
  ) { }

  canActivate(): Observable<boolean> | boolean {
    if (this.system.isBrowser()) {
      return this.afAuth.user.pipe(
        take(1),
        map(state => !!state),
        tap(loggedIn => {
          if (!loggedIn) {
            this.system.log('You must be logged in.');
            this.router.navigate(['/login']);
          }
        })
      );
    }
    return true; // FIXME: This is a temp hack to avoid auth flicker (https://goo.gl/GYGz3J)
  }

}
