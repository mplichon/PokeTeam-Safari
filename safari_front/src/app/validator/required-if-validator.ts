import { AbstractControl, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

export function requiredIfValidator(condition: boolean): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        
        if (!condition) {
            return null;
        }

        return Validators.required(form);
    };
}