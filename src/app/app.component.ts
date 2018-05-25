import { Component } from '@angular/core';

import { AuthService } from './auth/services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private AuthService: AuthService) { }

  isLoggedIn() {
    return this.AuthService.isLoggedIn();
  }

  logout() {
    this.AuthService.logout();
  }
}
