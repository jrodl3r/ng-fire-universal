import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { FormsService } from '../../services/forms.service';
import { NotifyService } from '../../services/notify.service';
import { PlatformService } from '../../services/platform.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  formErrors: FormErrors = {
    email: '',
    password: '',
  };
  validationMessages = {
    email: {
      required: 'Email is required',
      email: 'Valid email required',
      maxlength: 'Less than 100 characters long'
    },
    password: {
      required: 'Password is required',
      minlength: 'At least 6 characters long',
      maxlength: 'Less than 25 characters long'
    }
  };

  constructor(
    public auth: AuthService,
    private fb: FormBuilder,
    private forms: FormsService,
    private notify: NotifyService,
    public platform: PlatformService
  ) { }

  ngOnInit() {
    this.auth.redirectAfterSignIn();
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });
    this.loginForm.valueChanges.subscribe((data) =>
      this.forms.validate(data, this.loginForm, this.formErrors, this.validationMessages, ['email', 'password'])
    );
  }

  login() {
    const input = this.loginForm.getRawValue();
    this.auth.emailLogin(input.email, input.password);
  }

  resetPassword() {
    if (this.loginForm.getRawValue().email && !this.formErrors.email) {
      this.auth.resetPassword(this.loginForm.getRawValue().email)
        .catch(error => console.log(error));
    } else {
      this.notify.warn('Please enter your email first');
    }
  }

}
