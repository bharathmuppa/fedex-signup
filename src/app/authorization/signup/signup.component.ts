// Copyright Fedex 2021

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { ClientConfiguredMessagesService } from '../client-configured-messages/client-configured-messages.service';
import { IAbstractKeys } from '../models/i-abstract-keys';
import { ISignupUser } from '../models/i-signup-user';
import { crossControlsValidator } from '../validators/cross-controls-validator';
import { matchControlsValidator } from '../validators/match-control-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Smart container for Signup form.
 */
export class SignupComponent {

  public hide = true;
  public hideConfirmedPassword = true;
  public signupForm: FormGroup;
  public signupErrorMessages: { [key: string]: string | number | boolean };

  constructor(
    private formBuilder: FormBuilder,
    private clientConfiguredMessagesService: ClientConfiguredMessagesService,
    private authService: AuthService) {

    this.signupErrorMessages = this.clientConfiguredMessagesService.getConfigurationMessage();
    this.signupForm = this.initializeSignupForm();
  }

  /**
   * submit signup form data to register a user
   *
   * @param form model
   */
  public submitSignupForm(user: ISignupUser): void {
    if (this.signupForm.invalid) {
      return;
    }

    const { password: password, confirmedPassword: confirmedPassword, ...payload } = user;

    this.authService.registerUser(payload);
  }

  /**
   * convenience getter for easy access to form fields
   */
  public get f(): IAbstractKeys {
    return this.signupForm.controls;
  }

  /**
   * Initialize registration form
   */

  private initializeSignupForm(): FormGroup {
    return this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$')])],
      confirmedPassword: ['', Validators.required]
    }, {
      validator: [
        matchControlsValidator('confirmedPassword', 'password'),
        crossControlsValidator('password', 'firstName', 'lastName')
      ]
    });
  }

}
