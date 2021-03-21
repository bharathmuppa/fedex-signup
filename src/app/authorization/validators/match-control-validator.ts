// Copyright Fedex 2021

import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Check whether source value matches with target value
 *
 * @param source control acts as base control
 * @param targetFields controls to validate with source control
 * @returns validator function that has verification logic to either return one of the below
 * 1. error object with ```mismatch``` key, if source field not equals target field.
 * 2. null (match or pristine)
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function matchControlsValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        const sourceControl = control.get(source);
        if (!sourceControl) {
            // if controls is empty return no error
            return null;
        }
        if (!sourceControl.dirty) {
            return null;
        }

        const sourceField = control.get(source)?.value;
        const targetField = control.get(target)?.value;

        if (!sourceField || !targetField) {
            return null;
        }

        if (sourceField === targetField) {
            return null;
        } else {
            const error = {
                mismatch: true
            };
            // add error to source control (Required for Material forms fields)
            control.get(source)?.setErrors(error);
            return error;
        }
    };
}
