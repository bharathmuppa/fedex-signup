// Copyright Fedex 2021

import { AbstractControl, ValidatorFn } from '@angular/forms';

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

        return (sourceField === targetField) ? null : { mismatch: true };
    };
}
