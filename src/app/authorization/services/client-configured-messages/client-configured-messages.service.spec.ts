// Copyright Fedex 2021

import { TestBed } from '@angular/core/testing';

import { ClientConfiguredMessagesService } from './client-configured-messages.service';

describe('Client Configured Messages Service', () => {

  let service: ClientConfiguredMessagesService;
  let clientConfiguredMessagesServiceSpy: jasmine.SpyObj<ClientConfiguredMessagesService>;

  const CONFIG_MESSAGES = {
    firstNameRequired: 'First name is required.'
  };

  beforeEach(() => {
    clientConfiguredMessagesServiceSpy = jasmine.createSpyObj(ClientConfiguredMessagesService, ['getConfigurationMessage']);
    TestBed.configureTestingModule({
      providers: [
        { provide: ClientConfiguredMessagesService, useValue: clientConfiguredMessagesServiceSpy }
      ]
    });
    service = TestBed.inject(ClientConfiguredMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('first name should match "First name is required." ', () => {
    // Arrange
    clientConfiguredMessagesServiceSpy.getConfigurationMessage.and.returnValue(Object.seal(CONFIG_MESSAGES));

    // Act
    const clientConfiguredMessageObject = service.getConfigurationMessage();

    // Assert
    expect(clientConfiguredMessageObject.firstNameRequired).toContain('First name is required.');
  });

  it('first name message should not change to  "First name is not required." ', () => {
    // Arrange
    clientConfiguredMessagesServiceSpy.getConfigurationMessage.and.returnValue(Object.seal(CONFIG_MESSAGES));

    // Act
    const clientConfiguredMessageObject = service.getConfigurationMessage();

    try {
      clientConfiguredMessageObject.firstNameRequired = 'First name is not required.';
    }
    catch {
      // Assert
      expect(clientConfiguredMessageObject.firstNameRequired).not.toContain('First name is not required.');
      expect(clientConfiguredMessageObject.firstNameRequired).toContain('First name is required.');
    }

  });
});
