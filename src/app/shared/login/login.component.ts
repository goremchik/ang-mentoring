import { Component, OnInit } from '@angular/core';

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
}

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

}
