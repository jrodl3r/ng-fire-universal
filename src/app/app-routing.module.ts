import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';

const isLoggedOut = () => pipe(map(user => !!user ? ['me'] : true));
const isLoggedIn = () => pipe(map(user => !!user ? true : ['/']));
const isAdmin = () => pipe(customClaims, map(claims =>
  claims.admin === true ? claims.admin : ['/']
));

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'admin',
    loadChildren: () => import('./components/_admin/admin.module').then(m => m.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isAdmin }
  },
  {
    path: 'cart',
    loadChildren: () => import('./components/_cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLoggedOut }
  },
  {
    path: 'me',
    loadChildren: () => import('./components/_user/user.module').then(m => m.UserModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLoggedIn }
  },
  {
    path: 'store',
    loadChildren: () => import('./components/_store/store.module').then(m => m.StoreModule)
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isLoggedOut }
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
