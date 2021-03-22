// Copyright Fedex 2021

import { FormBuilder, FormGroup } from '@angular/forms';
import { matchControlsValidator } from './match-control-validator';

describe('Cross control validators', () => {

    const matchControlsValidatorFn = matchControlsValidator('source', 'target');
    let form: FormGroup;

    beforeEach(() => {

        form = new FormBuilder().group({
            source: [''],
            target: [''],
        }, {
            validators: matchControlsValidator('source', 'target1')
        });
    });

    it('should return null if input source is not changes', () => {

        // Assert
        expect(matchControlsValidatorFn(form)).toBeNull();
    });

    it('should return null if input source value matches target value', () => {
        // Arrange and Act
        form.controls.source.markAsDirty();
        form.controls.target.markAsDirty();

        form.controls.source.setValue('bharath');
        form.controls.target.setValue('bharath');

        // Assert
        expect(matchControlsValidatorFn(form)).toBeNull();
    });

    it('should return error if input source didn\'t match value of target', () => {
        // Arrange and Act
        form.controls.source.markAsDirty();
        form.controls.target.markAsDirty();

        form.controls.source.setValue('bharath');
        form.controls.target.setValue('bharath123');

        expect(matchControlsValidatorFn(form)?.mismatch).toBeTruthy();
    });


});
