import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as FireBase from 'firebase/app';


@Injectable()
export class AuthService {

  private user: Observable<FireBase.User>;
  private userDetails: FireBase.User = null;


  constructor(private FireBaseAuth: AngularFireAuth, private router: Router) {
    this.user = FireBaseAuth.authState;
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userDetails = user;
        } else {
          this.userDetails = null;
        }
      }
    );
  }


  signInWithGoogle() {
    return this.FireBaseAuth.auth.signInWithPopup(
      new FireBase.auth.GoogleAuthProvider()
    )
  }


  signInRegular(email, password) {
    const credential = FireBase.auth.EmailAuthProvider.credential(email, password);

    return this.FireBaseAuth.auth.signInWithEmailAndPassword(email, password)
  }


  isLoggedIn() {
    if (this.userDetails === null ) {
      return false;
    } else {
      return true;
    }
  }


  logout() {
    this.FireBaseAuth.auth.signOut()
      .then((res) => this.router.navigate(['/']));
  }
}
