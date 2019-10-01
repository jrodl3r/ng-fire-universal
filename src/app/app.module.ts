import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireAuthGuardModule } from '@angular/fire/auth-guard';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppRoutingModule } from './app-routing.module';
import { ServicesModule } from './services/services.module';
import { SharedModule } from './shared/shared.module';
import { NavModule } from './components/_nav/nav.module';

import { AppComponent } from './app.component';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { environment } from '../environments/environment';
import { config } from '../../firebase';

@NgModule({
  imports: [
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule,
    AngularFireAuthGuardModule,
    AngularFireFunctionsModule,
    AngularFireStorageModule,
    AngularFirestoreModule.enablePersistence(),
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    FormsModule,
    NavModule,
    ReactiveFormsModule,
    RouterModule,
    ServicesModule,
    SharedModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  declarations: [
    AppComponent,
    ErrorComponent,
    HomeComponent,
    LoadingComponent,
    LoginComponent,
    SignupComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
