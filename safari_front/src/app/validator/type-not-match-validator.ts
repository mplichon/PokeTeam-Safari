import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function typeNotMatchValidator(type1Field: string, type2Field: string): ValidatorFn {
    return (form: AbstractControl): ValidationErrors | null => {
        const type1 = form.get(type1Field);
        const type2 = form.get(type2Field);

        if (!type1 || !type2) {
            return null;
        }

        if (type1.value == type2.value) {
            type2.setErrors({ typeNotMatch: true });
        }

        else {
            type2.setErrors(null);
        }

        return null;
    };
}