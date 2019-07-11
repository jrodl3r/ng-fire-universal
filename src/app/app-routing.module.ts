import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard, customClaims } from '@angular/fire/auth-guard';
import { pipe } from 'rxjs';
import { map } from 'rxjs/operators';

import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';

const isUser = () => pipe(map(user => !!user ? !!user : ['/']));
const isAdmin = () => pipe(customClaims, map(claims =>
  claims.admin === true ? claims.admin : ['/']
));

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isUser }
  },
  {
    path: 'admin',
    loadChildren: () => import('./components/_admin/admin.module').then(m => m.AdminModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: isAdmin }
  },
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
