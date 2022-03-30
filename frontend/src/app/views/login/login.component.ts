import { AuthService } from './../../core/services/auth.service';
import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'div[login]',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginPage {
  password!: FormControl;
  alias!: FormControl;
  hidePassword: boolean = true;
  displayValidations: boolean = false;

  getEmailErrorMessage() {
    if (this.alias.hasError('required')) {
      return 'El campo no puede estar vacío';
    }
    if (this.alias.hasError('email')) {
      return 'El e-mail no es válido';

    }
    return '';
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) {
      return 'El campo no puede estar vacío';
    }
    return '';
  }

  onSubmitButtonClicked() {
    this.displayValidations = false;
    this.password.markAsTouched();
    this.alias.markAsTouched();
    this.authService.login(this.alias.value, this.password.value)
      .subscribe(success => !success ? this.fireValidations() : '');
  }

  private fireValidations() {
    this.displayValidations = true;
    setTimeout(() => {
      this.displayValidations = false;
      this.password.markAsUntouched();
      this.alias.markAsUntouched();
    }, 8000);
  }

  constructor(private authService: AuthService) {
    this.alias = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [Validators.required]);
  }
}
