// Copyright Fedex 2021

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SuccessComponent } from './success/success.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
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
export class AuthorizationRoutingModule { }

