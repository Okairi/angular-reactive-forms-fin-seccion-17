import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorsServices } from 'src/app/shared/service/validators.service';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
/* import * as customValidators from 'src/app/shared/validators/validators';
 */
@Component({
  templateUrl: './register-page.component.html',
  styles: [],
})
export class RegisterPageComponent {
  public myForm!: FormGroup;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      name: [
        '',
        [
          Validators.required,
          Validators.pattern(
            this.validatorServices.firstNameAndLastnamePattern
          ),
        ],
      ],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(this.validatorServices.emailPattern),
        ],
        [this.emailValidator],
      ],
      userName: [
        '',
        [Validators.required, this.validatorServices.cantBeStraider],
        [],
      ],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]],
    });
  }

  constructor(
    private fb: FormBuilder,
    private validatorServices: ValidatorsServices,
    private emailValidator: EmailValidatorService
  ) {}

  isValidField(field: string) {
    /* obtener validacion desde un servicio */
    /*     return (
      this.myForm.controls[field].errors && this.myForm.controls[field].touched
    ); */

    return this.validatorServices.isValidField(this.myForm, field);
  }

  onSubmit() {
    this.myForm.markAllAsTouched();
  }
}
