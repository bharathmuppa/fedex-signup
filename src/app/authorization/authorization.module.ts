// Copyright Fedex 2021

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthorizationRoutingModule } from './authorization-routing.module';
import { SignupComponent } from './signup/signup.component';
import { SharedModule } from '../shared/shared.module';
import { AuthService } from './auth.service';
import { ClientConfiguredMessagesService } from './client-configured-messages/client-configured-messages.service';


@NgModule({
  declarations: [SignupComponent],
  imports: [
    CommonModule,
    AuthorizationRoutingModule,
    SharedModule
  ],
  providers: [
    ClientConfiguredMessagesService,
    AuthService
  ]
})
export class AuthorizationModule { }

