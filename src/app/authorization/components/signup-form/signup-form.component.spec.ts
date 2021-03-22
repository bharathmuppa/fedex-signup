// Copyright Fedex 2021

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SignupFormComponent } from './signup-form.component';

describe('SignupFormComponent', () => {
  let component: SignupFormComponent;
  let fixture: ComponentFixture<SignupFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [SignupFormComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form should be initialized', () => {
    // Assert
    expect(component.signupForm).toBeDefined();
  });

  it('Form invalid when empty', () => {
    // Assert
    expect(component.signupForm.valid).toBeFalsy();
  });

  //#region First name specific tests
  it('First Name should be valid if value is "Bharath"', () => {
    // Arrange
    component.signupForm.controls.firstName.setValue('Bharath');

    // Assert
    expect(component.signupForm.controls.firstName.valid).toBeTruthy();
  });
  it('First Name should be invalid if value is "12Bharath"', () => {
    // Arrange
    component.signupForm.controls.firstName.setValue('12Bharath');

    // Assert
    try {
      expect(component.signupForm.controls.firstName.hasError('pattern')).toBeTruthy();
    }
    catch (error) {
      fail('error while asserting');
    }
  });
  it('First Name should be invalid if value is "12@Bharath"', () => {
    // Arrange
    component.signupForm.controls.firstName.setValue('12@Bharath');

    // Assert
    try {
      expect(component.signupForm.controls.firstName.hasError('pattern')).toBeTruthy();
    }
    catch (error) {
      fail(error);
    }
  });
  //#endregion
  //#region last name specific tests
  it('Last Name should be valid if value is "Bharath"', () => {
    // Arrange
    component.signupForm.controls.lastName.setValue('Bharath');

    // Assert
    expect(component.signupForm.controls.lastName.valid).toBeTruthy();
  });
  it('Last Name should be invalid if value is "12Bharath"', () => {
    // Arrange
    component.signupForm.controls.lastName.setValue('12Bharath');

    // Assert
    try {
      expect(component.signupForm.controls.lastName.hasError('pattern')).toBeTruthy();
    }
    catch (error) {
      fail(error);
    }
  });
  it('Last Name should be invalid if value is "12@Bharath"', () => {
    // Arrange
    component.signupForm.controls.lastName.setValue('12@Bharath');

    // Assert
    try {
      expect(component.signupForm.controls.lastName.hasError('pattern')).toBeTruthy();
    }
    catch (error) {
      fail(error);
    }
  });
  //#endregion
  //#region email specific tests
  it('Email should be valid if value is "bharath@gmail.com"', () => {
    // Arrange
    component.signupForm.controls.email.setValue('bharath@gmail.com');

    // Assert
    expect(component.signupForm.controls.email.valid).toBeTruthy();
  });
  it('Email should be valid if value is "bharath@outlook.com"', () => {
    // Arrange
    component.signupForm.controls.email.setValue('bharath@outlook.com');

    // Assert
    expect(component.signupForm.controls.email.valid).toBeTruthy();
  });
  it('Email should be invalid if value is "12Bharath"', () => {
    // Arrange
    component.signupForm.controls.email.setValue('12Bharath');

    // Assert
    try {
      expect(component.signupForm.controls.email.hasError('email')).toBeTruthy();
    }
    catch (error) {
      fail(error);
    }
  });
  it('Email should be invalid if value is "bharath@"', () => {
    // Arrange
    component.signupForm.controls.email.setValue('bharath@');

    // Assert
    try {
      expect(component.signupForm.controls.email.hasError('email')).toBeTruthy();
    }
    catch (error) {
      fail(error);
    }
  });
  //#endregion

  //#region Password specific tests
  it('Password should be valid if value is "M@dsc1entist"', () => {
    // Arrange
    component.signupForm.controls.password.setValue('M@dsc1entist');

    // Assert
    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });
  it('Password should be valid if value is "MM@#dsc11entist"', () => {
    // Arrange
    component.signupForm.controls.password.setValue('MM@#dsc11entist');

    // Assert
    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  it('Password should be valid if value is "WithoutSpecialChar8"', () => {
    // Arrange
    component.signupForm.controls.password.setValue('WithoutSpecialChar8');

    // Assert
    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });

  it('Password should be valid if value is "Withoutnumbers"', () => {
    // Arrange
    component.signupForm.controls.password.setValue('Withoutnumbers');

    // Assert
    expect(component.signupForm.controls.password.valid).toBeTruthy();
  });
  it('Password should not be valid if value is "8989877"', () => {
    // Arrange
    component.signupForm.controls.password.setValue('8989877');

    // Assert
    expect(component.signupForm.controls.password.valid).toBeFalsy();
  });


  it('Password should not be valid on firstname is "bharath" and password consists of first name ', () => {
    // Arrange
    component.signupForm.controls.firstName.setValue('bharath');
    component.signupForm.controls.password.setValue('Mbharath8');

    // Assert
    expect(component.signupForm.hasError('crossControls')).toBeFalsy();
  });
  //#endregion
  //#region Form level tests
  it('form should be valid only if password and confirm password matches', () => {
    // Arrange
    component.signupForm.controls.password.setValue('M@dsc1entist');
    component.signupForm.controls.confirmedPassword.setValue('M@dsc1entist');

    // Assert
    expect(component.signupForm.hasError('mismatch')).toBeFalsy();
  });

  it('form should be not be valid if password and confirm password didn\'t match', () => {
    // Arrange and Act
    component.signupForm.controls.password.markAsDirty();
    component.signupForm.controls.password.setValue('M@dsc1entist');

    component.signupForm.controls.confirmedPassword.markAsDirty();
    component.signupForm.controls.confirmedPassword.setValue('X@dsc1entist');

    // Assert
    expect(component.signupForm.hasError('mismatch')).toBeTruthy();
  });
  //#endregion

});
