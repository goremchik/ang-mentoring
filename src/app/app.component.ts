// Core
import { Component, OnInit } from '@angular/core';

// Services
import { AuthenticationService } from './core/services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthenticationService) {}

  ngOnInit() {
    this.auth.getUserInfo().subscribe();
  }
}
