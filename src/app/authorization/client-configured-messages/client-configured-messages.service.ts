// Copyright Fedex 2021

import { Injectable } from '@angular/core';
import { IAnonymousObject } from '../models/i-anonymous-collection';
import * as CONFIG_MESSAGES from './authorization.constants';

@Injectable({
  providedIn: 'root'
})
/**
 * Service to fetch and serve client defined messages
 */
export class AuthConfigService {

  public getConfigurationMessage(): IAnonymousObject {
    return Object.seal(CONFIG_MESSAGES);
  }
}
