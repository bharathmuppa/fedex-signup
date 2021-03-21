// Copyright Fedex 2021

import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'fx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
/**
 * Root container for the application
 */
export class AppComponent {
}
