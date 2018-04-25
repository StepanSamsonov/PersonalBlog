import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {AuthGuard} from "./services/auth-guard.service";
import {AuthService} from "./services/auth.service";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [LoginComponent],
  providers: [AuthService, AuthGuard]
})
export class AuthModule { }
