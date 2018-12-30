import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { FormsService } from '../../../services/forms.service';
import { ProfileService } from '../../../services/profile.service';

import { IProfile } from '../../../models/user';

type UserFields = 'company' | 'fname' | 'lname' | 'website';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  isUpdating: Boolean = false;
  profile: IProfile;
  profileSub: Subscription;
  profileForm: FormGroup;
  formErrors: FormErrors = {
    'company': '',
    'fname': '',
    'lname': '',
    'website': ''
  };
  validationMessages = {
    'company': {
      'maxlength': 'Less than 100 characters long.'
    },
    'fname': {
      'required': 'First Name is required.',
      'maxlength': 'Less than 60 characters long.'
    },
    'lname': {
      'required': 'Last Name is required.',
      'maxlength': 'Less than 60 characters long.'
    },
    'website': {
      'pattern': 'Valid URL required.',
      'maxlength': 'Less than 100 characters long.'
    }
  };

  constructor(
    private auth: AuthService,
    private forms: FormsService,
    private profileService: ProfileService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.profileSub = this.auth.user.subscribe(user => {
      if (user && user.profile) {
        this.profile = user.profile;
        this.buildForm();
      }
    });
  }

  ngOnDestroy() {
    this.profileSub.unsubscribe();
  }

  buildForm() {
    this.profileForm = this.fb.group({
      'company': [this.profile.company || '', [Validators.maxLength(100)]],
      'fname': [this.profile.fname || '', [ Validators.required, Validators.maxLength(60) ]],
      'lname': [this.profile.lname || '', [ Validators.required, Validators.maxLength(60) ]],
      'website': [this.profile.website || '', [
        Validators.maxLength(100),
        Validators.pattern('(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$')] // tslint:disable-line
      ]
    });
    this.profileForm.valueChanges.subscribe((data) =>
      this.forms.validate(data, this.profileForm, this.formErrors, this.validationMessages, ['fname', 'lname', 'company', 'website'])
    );
  }

  update() {
    this.isUpdating = true;
    this.profileService
      .updateProfile(this.profileForm.value)
      .then(() => this.isUpdating = false);
  }

}
