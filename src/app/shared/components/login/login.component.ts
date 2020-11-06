// Core
import { Component } from '@angular/core';

// Models
import { IUser } from '../../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements IUser {
  id: string;
  firstName: string;
  lastName: string;

  onClick(): void {
    console.log('Login');
  }
}
