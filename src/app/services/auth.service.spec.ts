import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { AngularFireAuthStub, FirestoreStub } from '../../testing/angularfire';
import { ToastrTestingModule } from './../../testing/toastr';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      RouterTestingModule,
      ToastrTestingModule
    ],
    providers: [
      { provide: AngularFireAuth, useValue: AngularFireAuthStub },
      { provide: AngularFirestore, useValue: FirestoreStub }
    ]
  }));

  it('should be created', () => {
    const service: AuthService = TestBed.get(AuthService);
    expect(service).toBeTruthy();
  });
});
