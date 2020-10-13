import { Component, OnInit } from '@angular/core';
import { IUser } from '../../core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, IUser {
  id: string;
  firstName: string;
  lastName: string;

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    console.log('Login');
  }
}
