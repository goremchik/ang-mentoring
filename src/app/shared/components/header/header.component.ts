// Core
import { Component, OnInit } from '@angular/core';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isLoggedIn = false;
  constructor(private authService: AuthenticationService) {}

  ngOnInit() {
    // TODO: it will be changed dynamically after RxJS module
    this.isLoggedIn = this.authService.isAuthenticated();
  }
}
