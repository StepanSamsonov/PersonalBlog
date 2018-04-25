import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {
  }

  signInWithEmail() {

    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        this.router.navigate(['home']);
      })
      .catch((err) => console.log('error: ' + err));
  }



  ngOnInit() {
  }

}
