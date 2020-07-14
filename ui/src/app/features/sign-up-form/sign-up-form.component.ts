/*
 * Copyright (c) 2020 the original author or authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
 * or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import {User} from '../../data/user';
import {Store} from '@ngrx/store';
import {AppState} from '../../store';
import {Observable, Subscription} from 'rxjs';
import {ROUTERS_URL} from '../../data/routers-url.variable';
import {resetErrorMessage, signUp} from '../../store/auth/action';
import {selectAuthState} from '../../store/auth/selectors';
import {EMAIL_REGEXP_PATTERN} from 'src/app/core/constants';
import {SignUp} from '../../data/sign-up';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent implements OnInit, OnDestroy {
  form: FormGroup;
  user: User;
  getState: Observable<any>;
  isLoading = false;
  ROUTERS_URL = ROUTERS_URL;
  stateSubscription: Subscription;

  passwordMatchValidator: ValidatorFn = (formGroup: FormGroup): ValidationErrors | null => {
    if (formGroup.get('password').value === formGroup.get('confirmPassword').value) {
      return null;
    } else {
      return { passwordMismatch: true };
    }
  }

  constructor(private store: Store<AppState>) {
    this.getState = this.store.select(selectAuthState);
  }

  ngOnInit() {
    this.form = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      email: new FormControl(null, [Validators.required, Validators.pattern(EMAIL_REGEXP_PATTERN)]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    }, { validators: this.passwordMatchValidator });

    this.stateSubscription = this.getState.subscribe((state) => {
      this.isLoading = state.isLoading;
    });
  }

  ngOnDestroy() {
    this.store.dispatch(resetErrorMessage());
    this.stateSubscription.unsubscribe();
  }

  onSubmit() {
    this.user = this.form.value;
    const payload: SignUp = {
      email: this.user.email,
      password: this.user.password,
      firstName: this.user.firstName,
      lastName: this.user.lastName
    };
    this.isLoading = true;
    this.store.dispatch(signUp(payload));
  }
}
