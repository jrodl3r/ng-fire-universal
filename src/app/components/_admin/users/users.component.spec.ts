import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';

import { AngularFireAuthStub, AngularFireFunctionsStub, FirestoreStub } from 'src/testing/angularfire';
import { ToastrTestingModule } from 'src/testing/toastr';

import { AdminService } from 'src/app/services/admin.service';
import { SortUsersPipe } from 'src/app/services/pipes/sort-users.pipe';

import { UsersComponent } from './users.component';

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrTestingModule
      ],
      declarations: [
        UsersComponent,
        SortUsersPipe
      ],
      providers: [
        AdminService,
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFirestore, useValue: FirestoreStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
