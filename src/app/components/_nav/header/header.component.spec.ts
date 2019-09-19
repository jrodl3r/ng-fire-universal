import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFirestore } from '@angular/fire/firestore';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AngularFireAuthStub, AngularFireFunctionsStub, FirestoreStub } from 'src/testing/angularfire';
import { ToastrTestingModule } from 'src/testing/toastr';

import { HeaderComponent } from './header.component';

import { environment } from 'src/environments/environment';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ToastrTestingModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
      ],
      declarations: [HeaderComponent],
      providers: [
        { provide: AngularFireAuth, useValue: AngularFireAuthStub },
        { provide: AngularFireFunctions, useValue: AngularFireFunctionsStub },
        { provide: AngularFirestore, useValue: FirestoreStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
