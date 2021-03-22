// Copyright Fedex 2021

import { FormBuilder, FormGroup } from '@angular/forms';
import { crossControlsValidator } from './cross-controls-validator';

describe('Cross control validators', () => {

    const crossControlsValidatorFn = crossControlsValidator('source', 'target1', 'target2');
    let form: FormGroup;

    beforeEach(() => {

        form = new FormBuilder().group({
            source: [''],
            target1: [''],
            target2: ['']
        }, {
            validators: crossControlsValidator('source', 'target1', 'target2')
        });
    });

    it('should return null if input source doesn\'t includes value of target1', () => {
        // Arrange and Act
        form.controls.source.markAsDirty();
        form.controls.target1.markAsDirty();

        form.controls.source.setValue('bharath');
        form.controls.target1.setValue('12345');

        // Assert
        expect(crossControlsValidatorFn(form)).toBeNull();
    });

    it('should return null if input source doesn\'t includes  value of target2', () => {
        // Arrange and Act
        form.controls.source.markAsDirty();
        form.controls.target2.markAsDirty();

        form.controls.source.setValue('bharath');
        form.controls.target2.setValue('12345');

        // Assert
        expect(crossControlsValidatorFn(form)).toBeNull();
    });

    it('should return error if input source includes value of target1', () => {
        // Arrange and Act
        form.controls.source.markAsDirty();
        form.controls.target1.markAsDirty();

        form.controls.source.setValue('bharath');
        form.controls.target1.setValue('bharath');

        expect(crossControlsValidatorFn(form)?.crossControls).toBeTruthy();
    });
    it('should return error if input source includes any value of target1 or target2', () => {
        // Arrange and Act
        form.controls.source.markAsDirty();
        form.controls.target1.markAsDirty();
        form.controls.target2.markAsDirty();

        form.controls.source.setValue('muppa');
        form.controls.target1.setValue('bharath');
        form.controls.target2.setValue('muppa');

        // Assert
        expect(crossControlsValidatorFn(form)?.crossControls).toBeTruthy();
    });

});
