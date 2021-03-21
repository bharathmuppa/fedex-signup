// Copyright Fedex 2021

import { ComponentFixture, discardPeriodicTasks, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { SharedModule } from 'src/app/shared/shared.module';
import { AuthService } from '../../services/auth-service/auth.service';
import { SignupContainerComponent } from './signup-container.component';

describe('SignupContainerComponent', () => {
  let component: SignupContainerComponent;
  let fixture: ComponentFixture<SignupContainerComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let authService: AuthService;
  let router: Router;

  beforeEach(async () => {

    authServiceSpy = jasmine.createSpyObj(AuthService, ['registerUser']);
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes(
          [{ path: 'authorization/success', redirectTo: '' }]
        ),
        SharedModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [SignupContainerComponent],
      providers: [
        { provide: AuthService, useValue: authServiceSpy },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupContainerComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should register user when user has valid data', fakeAsync(() => {
    // Arrange
    authServiceSpy.registerUser.and.returnValue(of(true));
    const navigateSpy = spyOn(router, 'navigate');
    const user = {
      firstName: 'Bharath',
      lastName: 'Muppa',
      email: 'bhaathmuppa@gmail.com'
    };

    // Act
    component.sendUserForRegistration(user);
    tick(500);
    // Assert
    expect(navigateSpy).toHaveBeenCalledWith(['authorization', 'success']);
    discardPeriodicTasks();
  }));
});
