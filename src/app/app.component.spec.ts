import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';

import { AngularFireAuthStub, AngularFireFunctionsStub, FirestoreStub } from './../testing/angularfire';
import { ToastrTestingModule } from './../testing/toastr';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
      ],
      declarations: [AppComponent],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
