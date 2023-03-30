import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from "@angular/forms";

@Directive
({
  selector: '[appforbiddenEmail]',
  providers: [{provide: NG_VALIDATORS, useExisting: ForbiddenValidatorDirective, multi: true}]
})

export class ForbiddenValidatorDirective implements Validator{

  @Input('appforbiddenEmail') forbiddenEmail = '';

  validate(control: AbstractControl): ValidationErrors | null {
    return this.forbiddenEmail ? forbiddenEmailValidator(new RegExp(this.forbiddenEmail, '/la[0-9]{6}@student\.helha\.be/'))(control) : null;
  }

}
function forbiddenEmailValidator(nameReg: RegExp): ValidatorFn {
  return (control: AbstractControl) : ValidationErrors | null => {
    const forbidden = nameReg.test(control.value);
    return forbidden ? {forbiddenEmail: {value: control.value}} : null;
  }
}

