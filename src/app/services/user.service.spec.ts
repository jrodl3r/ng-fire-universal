import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { AngularFireAuthStub, AngularFireFunctionsStub, AngularFireStorageStub, FirestoreStub } from '../../testing/angularfire';
import { ToastrTestingModule } from './../../testing/toastr';

import { UserService } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      ToastrTestingModule
    ],
    providers: [
      { provide: AngularFireAuth, useValue: AngularFireAuthStub },
      { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
      { provide: AngularFirestore, useValue: FirestoreStub },
      { provide: AngularFireStorage, useValue: AngularFireStorageStub }
    ]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });
});
