// Copyright Fedex 2021

import { Injectable } from '@angular/core';
import { IAnonymousObject } from '../../models/i-anonymous-collection';
import * as CONFIG_MESSAGES from './client.constants';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to fetch and serve client defined messages
 */
export class ClientConfiguredMessagesService {

  public getConfigurationMessage(): IAnonymousObject {
    return Object.freeze(CONFIG_MESSAGES);
  }
}
