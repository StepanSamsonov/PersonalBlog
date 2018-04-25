import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import {AngularFireDatabase} from "angularfire2/database";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


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



  ngOnInit() {
  }

}
