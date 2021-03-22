// Copyright Fedex 2021

import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

export class CrossControlsMatcher implements ErrorStateMatcher {
    isErrorState(control: FormControl | null): boolean {
        const invalidCtrl = !!(control?.invalid && control?.touched);
        const invalidParent = !!(control?.parent?.invalid && control?.parent?.dirty && control?.parent?.hasError('crossControls'));

        return invalidCtrl || invalidParent;
    }
}

