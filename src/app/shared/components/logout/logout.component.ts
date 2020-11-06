// Core
import { Component } from '@angular/core';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {
  constructor(public authService: AuthenticationService) {}
  onClick(): void {
    this.authService.logout();
  }
}
