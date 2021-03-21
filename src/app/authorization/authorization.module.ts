// Copyright Fedex 2021

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ClientConfiguredMessagesService } from './services/client-configured-messages/client-configured-messages.service';
import { SuccessComponent } from './success/success.component';
import { AuthService } from './services/auth-service/auth.service';
import { SignupContainerComponent } from './signup/signup-container/signup-container.component';
import { SignupFormComponent } from './signup/signup-form/signup-form.component';


@NgModule({
  declarations: [SuccessComponent, SignupContainerComponent, SignupFormComponent],
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    HttpClientModule,
    SharedModule
  ],
  providers: [
    ClientConfiguredMessagesService,
    AuthService
  ]
})
export class AuthorizationModule { }

