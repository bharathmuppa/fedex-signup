// Copyright Fedex 2021

// Copyright Fedex 2021


import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IUser } from 'src/app/shared/models/i-user.model';
import { IAbstractKeys } from '../../models/i-abstract-keys';
import { IAnonymousObject } from '../../models/i-anonymous-collection';
import { ISignupUser } from '../../models/i-signup-user';
import { ClientConfiguredMessagesService } from '../../services/client-configured-messages/client-configured-messages.service';
import { CrossControlsMatcher } from '../../validators/cross-controls-matcher';
import { crossControlsValidator } from '../../validators/cross-controls-validator';
import { matchControlsValidator } from '../../validators/match-control-validator';

@Component({
  selector: 'fx-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SignupFormComponent {

  @Output()
  public registerUser: EventEmitter<IUser> = new EventEmitter<IUser>();
  public hidePassword = true;
  public hideConfirmedPassword = true;
  public signupForm: FormGroup;
  public signupErrorMessages: IAnonymousObject;
  public showLoader: boolean;

  public crossControlsMatcher = new CrossControlsMatcher();

  /**
   * Creates instance of ```SignupComponent``` component
   *
   * @param clientConfiguredMessagesService to fetch client configured messages
   * @param formBuilder to generate elegant form group
   */
  constructor(
    private clientConfiguredMessagesService: ClientConfiguredMessagesService,
    private formBuilder: FormBuilder,
  ) {
    this.showLoader = false;
    this.signupForm = this.initializeSignupForm();
    this.signupErrorMessages = this.clientConfiguredMessagesService.getConfigurationMessage();
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
    this.registerUser.emit(payload);
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
      firstName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      lastName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z]*$/)]],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d\w\W]{8,}$/)])],
      confirmedPassword: ['', Validators.required]
    }, {
      validator: [
        matchControlsValidator('confirmedPassword', 'password'),
        crossControlsValidator('password', 'firstName', 'lastName')
      ]
    });
  }

}
