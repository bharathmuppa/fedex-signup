// Copyright Fedex 2021

import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

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
export class SignupContainerComponent implements OnDestroy {

  @ViewChild(SignupFormComponent, { static: true })
  private signupFormComponent?: SignupFormComponent;
  private signupErrorMessages: IAnonymousObject;

  private registerUserSubscription$?: Subscription;
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

  ngOnDestroy(): void {
    if (this.registerUserSubscription$) {
      this.registerUserSubscription$.unsubscribe();
    }
  }


  public sendUserForRegistration(user: IUser): void {
    this.disableChildSignupForm();

    this.registerUserSubscription$ = this.authService.registerUser(user).pipe(finalize(() => {
      this.enableChildSignupForm();
    })).subscribe((isUserRegisteredSuccessfully: boolean) => {

      if (!isUserRegisteredSuccessfully) {
        return;
      }

      this.navigateToSuccessPage();

    }, () => {
      this.showErrorMessageInSnackBar();
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

  private enableChildSignupForm() {
    if (this.signupFormComponent) {
      this.signupFormComponent.showLoader = false;
      this.signupFormComponent.signupForm.enable();
    }
  }
  private disableChildSignupForm() {
    if (this.signupFormComponent) {
      this.signupFormComponent.showLoader = true;
      this.signupFormComponent.signupForm.disable();
    }
  }


}
