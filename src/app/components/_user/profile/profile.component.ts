import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../../../services/auth.service';
import { FormsService } from '../../../services/forms.service';
import { PlatformService } from '../../../services/platform.service';
import { UserService } from '../../../services/user.service';

import { IProfile } from '../../../models/user';

type UserFields = 'company' | 'fname' | 'lname' | 'website';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userSub: Subscription;
  profile: IProfile;
  profileForm: FormGroup;
  formErrors: FormErrors = { company: '', fname: '', lname: '', website: '' };
  validationMessages = {
    company: {
      maxlength: 'Less than 100 characters long'
    },
    fname: {
      required: 'First Name is required',
      maxlength: 'Less than 60 characters long'
    },
    lname: {
      required: 'Last Name is required',
      maxlength: 'Less than 60 characters long'
    },
    website: {
      pattern: 'Valid URL required',
      maxlength: 'Less than 100 characters long'
    }
  };
  isDirty = false;
  isUpdating = false;

  constructor(
    private auth: AuthService,
    private user: UserService,
    private forms: FormsService,
    private fb: FormBuilder,
    public platform: PlatformService
  ) { }

  ngOnInit() {
    this.userSub = this.auth.user.subscribe(user => {
      this.profile = user.profile || {} as IProfile;
      this.buildForm();
    });
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }

  buildForm() {
    this.profileForm = this.fb.group({
      company: [this.profile.company || '', [Validators.maxLength(100)]],
      fname: [this.profile.fname || '', [
        Validators.required,
        Validators.maxLength(60)
      ]],
      lname: [this.profile.lname || '', [
        Validators.required,
        Validators.maxLength(60)
      ]],
      website: [this.profile.website || '', [
        Validators.maxLength(100),
        Validators.pattern(this.forms.urlPattern)
      ]]
    });
    this.profileForm.valueChanges.subscribe((data) =>
      this.forms.validate(data, this.profileForm, this.formErrors, this.validationMessages, ['fname', 'lname', 'company', 'website'])
    );
  }

  detectChange() {
    this.isDirty =
      this.profile.fname === this.profileForm.value.fname && this.profile.lname === this.profileForm.value.lname
      && this.profile.company === this.profileForm.value.company && this.profile.website === this.profileForm.value.website
        ? false : true;
  }

  updateProfile() {
    this.isUpdating = true;
    this.user.updateProfile(this.profileForm.value)
      .then(() => {
        this.isUpdating = false;
        this.isDirty = false;
      });
  }

}
