import { TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { AngularFireFunctionsStub, FirestoreStub } from './../../testing/angularfire';
import { ToastrTestingModule } from './../../testing/toastr';

import { AdminService } from './admin.service';

describe('AdminService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrTestingModule],
    providers: [
      AdminService,
      { provide: AngularFirestore, useValue: FirestoreStub },
      { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub }
    ]
  }));

  it('should be created', () => {
    const service: AdminService = TestBed.get(AdminService);
    expect(service).toBeTruthy();
  });
});
