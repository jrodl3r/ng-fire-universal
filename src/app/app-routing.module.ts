import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ErrorComponent } from './components/error/error.component';

const isUser = () => pipe(map(user => !!user ? true : ['/']));
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
    path: 'me',
    loadChildren: () => import('./components/_user/user.module').then(m => m.UserModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isUser }
  },
  {
    path: 'cart',
    loadChildren: () => import('./components/_cart/cart.module').then(m => m.CartModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./components/_store/store.module').then(m => m.StoreModule)
  },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
