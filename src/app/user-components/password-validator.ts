import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function passwordValidator(): ValidatorFn{
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password');
    const confirm_password = control.get('confirm_password');

    if(password != null && confirm_password != null){
      return password.value == confirm_password.value ? null : {password_mismatch : {value : control.value}}
    }else {
      return null;
    }
  };
}
