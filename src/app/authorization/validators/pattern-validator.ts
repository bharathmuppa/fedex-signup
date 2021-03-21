// Copyright Fedex 2021

import { ValidationErrors, ValidatorFn, AbstractControl } from '@angular/forms';
/**
 * Validator that requires the control's value to match a regex pattern.
 *
 * @param regex pattern
 * @param error key to identify form error
 * @returns validator function that has verification logic to either return error or null on pattern
 * matching
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function patternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (!control.value) {
            // if control is empty return no error
            return null;
        }

        // test the value of the control against the regexp supplied
        const valid = regex.test(control.value);

        // if true, return no error (no error), else return error passed in the second parameter
        return valid ? null : error;
    };
}
