// Copyright Fedex 2021

import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { IUser } from 'src/app/shared/models/i-user.model';
import { IAnonymousObject } from '../../models/i-anonymous-collection';
import { AuthService } from '../../services/auth-service/auth.service';
import { ClientConfiguredMessagesService } from '../../services/client-configured-messages/client-configured-messages.service';
import { SignupFormComponent } from '../signup-form/signup-form.component';

@Component({
  selector: 'fx-signup-container',
  templateUrl: './signup-container.component.html',
  styleUrls: ['./signup-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Acts as container fo signup form
 */
export class SignupContainerComponent {

  @ViewChild(SignupFormComponent, { static: true })
  private signupFormComponent?: SignupFormComponent;
  private signupErrorMessages: IAnonymousObject;

  /**
   * Creates instance of ```SignupComponent``` component
   *
   * @param authService to register user with fedex backend api
   * @param clientConfiguredMessagesService to fetch client configured messages
   * @param router to navigate across app
   * @param snackBar to show error messages
   */
  constructor(
    private authService: AuthService,
    private clientConfiguredMessagesService: ClientConfiguredMessagesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {

    this.signupErrorMessages = this.clientConfiguredMessagesService.getConfigurationMessage();

  }


  public sendUserForRegistration(user: IUser): void {
    if (this.signupFormComponent) {
      this.signupFormComponent.showLoader = true;
      this.signupFormComponent.signupForm.disable();
    }

    this.authService.registerUser(user).subscribe((isUserRegisteredSuccessfully: boolean) => {

      if (!isUserRegisteredSuccessfully) {
        return;
      }

      this.navigateToSuccessPage();

    }, () => {
      this.showErrorMessageInSnackBar();
    }, () => {

      if (this.signupFormComponent) {
        this.signupFormComponent.showLoader = false;
        this.signupFormComponent.signupForm.enable();
      }
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
