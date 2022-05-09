import { ValidationErrors, AbstractControl, ValidatorFn } from "@angular/forms";
export class RegisterValidators {
    static match(nameControl: string, matchingNameControl: string): ValidatorFn {
        return (group: AbstractControl): ValidationErrors | null => {
            const control = group.get(nameControl);
            const matchingControl = group.get(matchingNameControl)
            
            if (!control || !matchingControl) {
                return { controlNotFound: false }
            }
    
            const error = control.value === matchingControl.value ? 
                null :
                { noMatch: true }
            
            return error;
        }
    }
}
