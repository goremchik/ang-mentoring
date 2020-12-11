// Core
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

// Models
import { IUser } from 'src/app/core';

@Component({
  selector: 'app-auth-action',
  templateUrl: './auth-action.component.html',
  styleUrls: ['./auth-action.component.scss'],
})
export class AuthActionComponent implements OnInit {
  user$$: BehaviorSubject<IUser>;

  constructor(public authService: AuthenticationService) {}

  ngOnInit() {
    this.user$$ = this.authService.subject$$;
  }

  onLogoutClick(): void {
    this.authService.logout();
  }
}
