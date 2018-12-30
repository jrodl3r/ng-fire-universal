import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { SystemService } from '../../services/system.service';
import { FormsService } from '../../services/forms.service';
import { SeoService } from '../../services/seo.service';

type UserFields = 'email' | 'password';
type FormErrors = { [u in UserFields]: string };

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
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
      title: 'Sign Up',
      description: 'NgFireUniversal » Sign Up',
      slug: 'signup'
    });
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.fb.group({
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
    this.signupForm.valueChanges.subscribe((data) =>
      this.forms.validate(data, this.signupForm, this.formErrors, this.validationMessages, ['email', 'password'])
    );
  }

  signup() {
    this.auth.emailSignUp(this.signupForm.value['email'], this.signupForm.value['password']);
  }

}
