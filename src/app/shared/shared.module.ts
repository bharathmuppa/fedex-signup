// Copyright Fedex 2021

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Flex layout specific modules
import { FlexLayoutModule } from '@angular/flex-layout';

// Material specific modules
import { HeaderComponent } from './components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';


@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
  ],
  exports: [
    FlexLayoutModule,
    HeaderComponent,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  declarations: [HeaderComponent]
})
/**
 * Bundles all modules required across application
 */
export class SharedModule { }
