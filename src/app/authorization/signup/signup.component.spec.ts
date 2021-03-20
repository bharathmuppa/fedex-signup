import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../services/auth-service/auth.service';
import { ClientConfiguredMessagesService } from '../services/client-configured-messages/client-configured-messages.service';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let clientConfiguredMessagesServiceSpy: jasmine.SpyObj<ClientConfiguredMessagesService>;
  let formBuilderSpy: jasmine.SpyObj<FormBuilder>;
  let snackBarSpy: jasmine.SpyObj<MatSnackBar>;

  beforeEach(async () => {

    const authService = jasmine.createSpyObj(AuthService, ['registerUser']);
    const clientConfiguredMessagesService = jasmine.createSpyObj(ClientConfiguredMessagesService, ['getConfigurationMessage']);
    const formBuilder = jasmine.createSpyObj(FormBuilder, ['group']);
    const snackBar = jasmine.createSpyObj(MatSnackBar, ['open']);

    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [SignupComponent],
      providers: [
        { provide: AuthService, useValue: authService },
        { provide: ClientConfiguredMessagesService, useValue: clientConfiguredMessagesService },
        { provide: FormBuilder, useValue: formBuilder },
        { provide: MatSnackBar, useValue: snackBar }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
