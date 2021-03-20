// Copyright Fedex 2021

import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/models/i-user.model';

import { AuthService } from '../services/auth-service/auth.service';
import { ClientConfiguredMessagesService } from '../services/client-configured-messages/client-configured-messages.service';
import { crossControlsValidator } from '../validators/cross-controls-validator';
import { IAbstractKeys } from '../models/i-abstract-keys';
import { IAnonymousObject } from '../models/i-anonymous-collection';
import { ISignupUser } from '../models/i-signup-user';
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
  public signupErrorMessages: IAnonymousObject;

  public showLoader: boolean;

  /**
   * Creates instance of ```SignupComponent``` component
   *
   * @param authService to register user with fedex backend api
   * @param clientConfiguredMessagesService to fetch client configured messages
   * @param formBuilder to generate elegant form group
   * @param router to navigate across app
   */
  constructor(
    private authService: AuthService,
    private clientConfiguredMessagesService: ClientConfiguredMessagesService,
    private formBuilder: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.showLoader = false;
    this.signupErrorMessages = this.clientConfiguredMessagesService.getConfigurationMessage();
    this.signupForm = this.initializeSignupForm();
  }

  /**
   * submit signup form data to register a user
   *
   * @param form model
   */
  public submitSignupForm(user: ISignupUser): void {

    if (this.signupForm.invalid || this.showLoader) {
      return;
    }

    const { password: password, confirmedPassword: confirmedPassword, ...payload } = user;
    this.showLoader = true;
    this.signupForm.disable();
    this.sendUserForRegistration(payload);
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


  private sendUserForRegistration(user: IUser): void {

    this.authService.registerUser(user).subscribe((isUserRegisteredSuccessfully: boolean) => {

      if (!isUserRegisteredSuccessfully) {
        return;
      }

      this.navigateToSuccessPage();

    }, () => {
      this.showErrorMessageInSnackBar();
    }, () => {
      this.showLoader = false;
      this.signupForm.enable();
    });
  }

  private navigateToSuccessPage(): void {
    this.router.navigate(['authorization', 'success']);
  }

  private showErrorMessageInSnackBar(): void {
    this.snackBar.open(this.signupErrorMessages.USER_REGISTRATION_FAIL.toString(), 'Error', {
      duration: 3000,
    });
  }

}
