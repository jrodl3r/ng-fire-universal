import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';
import { FormsService } from '../../services/forms.service';
import { SeoService } from '../../services/seo.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isPassReset: Boolean = false;
  formErrors: FormErrors = {
    'email': '',
    'password': '',
  };
  validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Valid email required.',
      'maxlength': 'Less than 100 characters long.'
    },
    'password': {
      'required': 'Password is required.',
      'minlength': 'At least 6 characters long.',
      'maxlength': 'Less than 25 characters long.'
    }
  };

  constructor(
    public auth: AuthService,
    public system: SystemService,
    private forms: FormsService,
    private fb: FormBuilder,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.auth.redirectAfterSignIn();
    this.seo.setMetaTags({
      title: 'Login',
      description: 'NgFireUniversal » Login',
      slug: 'login'
    });
    this.buildForm();
  }

  buildForm() {
    this.loginForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email,
        Validators.maxLength(100)
      ]],
      'password': ['', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(25)
      ]]
    });

    this.loginForm.valueChanges.subscribe((data) =>
      this.forms.validate(data, this.loginForm, this.formErrors, this.validationMessages, ['email', 'password'])
    );
    this.forms.validate({}, this.loginForm, this.formErrors, this.validationMessages, ['email', 'password']);
  }

  login() {
    this.auth.emailLogin(this.loginForm.value['email'], this.loginForm.value['password']);
  }

  resetPassword() {
    this.auth.resetPassword(this.loginForm.value['email'])
      .then(() => this.isPassReset = true);
  }

}
