import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthService } from '../../../../services/auth.service';
import { PlatformService } from '../../../../services/platform.service';
import { UserService } from '../../../../services/user.service';

import { EditAvatarComponent } from './edit-avatar.component';

describe('EditAvatarComponent', () => {
  let component: EditAvatarComponent;
  let fixture: ComponentFixture<EditAvatarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EditAvatarComponent],
      providers: [
        AuthService,
        PlatformService,
        UserService
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
