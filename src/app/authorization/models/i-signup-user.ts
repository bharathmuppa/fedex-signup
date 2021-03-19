// Copyright Fedex 2021

import { IUser } from '../../shared/models/i-user.model';

/**
 * Interface for signup form user model
 */
export interface ISignupUser extends IUser {
    password: string;
    confirmedPassword: string;
}
