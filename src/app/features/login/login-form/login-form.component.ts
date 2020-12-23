// Core
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

// Models
import { IAuth } from 'src/app/core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<IAuth>();
  form: FormGroup;

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      login: ['', [Validators.required, Validators.maxLength(50)]],
      password: ['', [Validators.required, Validators.maxLength(50)]],
    })
  }

  onSubmit(): void {
    this.formSubmit.emit({
      login: this.getField('login').value,
      password: this.getField('password').value,
    });
  }

  getField(fieldName: string): AbstractControl {
    return this.form.get(fieldName);
  }
}
