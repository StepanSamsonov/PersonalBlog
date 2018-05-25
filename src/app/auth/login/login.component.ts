import { AngularFireDatabase } from "angularfire2/database";
import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string;

  user = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService,
              private router: Router,
              private db: AngularFireDatabase) { }


  signInWithGoogle() {
    this.authService.signInWithGoogle()
      .then((res) => {
        this.email = res.additionalUserInfo.profile.email;
        let sub = this.db.object('const').valueChanges().subscribe(data => {
          if ((data as any).email.toLowerCase() === this.email) {
            this.router.navigate(['home']);
            sub.unsubscribe();
          } else {
            this.authService.logout();
            alert('Вход только для владельцев сайта.');
            sub.unsubscribe();
          }
        });
      })
      .catch((err) => console.log(err));
  }


  signInWithEmail() {
    this.authService.signInRegular(this.user.email, this.user.password)
      .then((res) => {
        this.router.navigate(['home']);
      })
      .catch((err) => console.log('error: ' + err));
  }
}
