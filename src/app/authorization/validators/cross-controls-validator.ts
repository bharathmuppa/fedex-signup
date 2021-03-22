// Copyright Fedex 2021

import { AbstractControl, ValidatorFn } from '@angular/forms';

/**
 * Check whether source control includes values of target controls
 *
 * @param source control acts as base control
 * @param targetFields controls to validate with source control
 * @returns validator function that has verification logic to either return one of the below
 * 1. error object with ```crossControls``` key, if source field not equals target field.
 * 2. null (match or pristine)
 */
// eslint-disable-next-line prefer-arrow/prefer-arrow-functions
export function crossControlsValidator(source: string, ...targetFields: string[]): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {

        const sourceControl = control.get(source);

        if (!sourceControl) {
            return null;
        }
        if (!sourceControl.dirty) {
            // if controls is not changed return no error
            return null;
        }

        let sourceField = control.get(source)?.value ?? '';
        sourceField = sourceField.toLowerCase();

        for (let targetField of targetFields) {
            targetField = control.get(targetField)?.value ?? '';
            targetField = targetField.toLowerCase();
            if (targetField.length > 0 && sourceField.includes(targetField)) {
                return { crossControls: true };
            }
        }

        return null;
    };
}


