import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AuthService } from '../../services/auth.service';
import { FormsService } from '../../services/forms.service';
import { PlatformService } from '../../services/platform.service';
import { SeoService } from 'src/app/services/seo.service';

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
    public platform: PlatformService,
    private seo: SeoService
  ) { }

  ngOnInit() {
    this.seo.setMetaTags({
      title: 'ng-fire-universal » Sign Up',
      description: 'ng-fire-universal » Sign Up',
      slug: 'signup'
    });
    this.buildForm();
  }

  buildForm() {
    this.signupForm = this.fb.group({
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
    this.signupForm.valueChanges.subscribe((data) =>
      this.forms.validate(data, this.signupForm, this.formErrors, this.validationMessages, ['email', 'password'])
    );
  }

  signup() {
    const input = this.signupForm.getRawValue();
    this.auth.emailSignUp(input.email, input.password);
  }

}
