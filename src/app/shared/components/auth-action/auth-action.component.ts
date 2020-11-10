// Core
import { Component, OnInit } from '@angular/core';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-auth-action',
  templateUrl: './auth-action.component.html',
  styleUrls: ['./auth-action.component.scss'],
})
export class AuthActionComponent implements OnInit {
  isLoggedIn = false;

  constructor(public authService: AuthenticationService) {}

  ngOnInit() {
    // TODO: it will be changed dynamically after RxJS module
    this.isLoggedIn = this.authService.isAuthenticated();
  }

  onLogoutClick(): void {
    this.authService.logout();
  }
}
