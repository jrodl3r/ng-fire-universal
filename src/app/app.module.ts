import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';

import { HomeComponent } from './components/home/home.component';
import { StartComponent } from './components/start/start.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    StartComponent,
    SignupComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-fire-universal' }),
    AppRoutingModule,
    ServicesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
