import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router,
              private authService: AuthService) { }

  canActivate() {
    return true;
  }

}
