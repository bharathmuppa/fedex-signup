// Copyright Fedex 2021

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignupContainerComponent } from './signup/signup-container/signup-container.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: 'signup', component: SignupContainerComponent },
  {
    path: 'success',
    component: SuccessComponent
  },
  {
    path: '',
    redirectTo: 'signup',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
/**
 * Authorization module specific routes
 */
export class AuthorizationRoutingModule { }

