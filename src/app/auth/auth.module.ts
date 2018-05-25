import { CommonModule } from '@angular/common';
import { FormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';

import { AuthGuard } from "./services/auth-guard.service";
import { AuthService } from "./services/auth.service";
import { LoginComponent } from "./login/login.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
  ],
  declarations: [
    LoginComponent,
  ],
  providers: [
    AuthService,
    AuthGuard,
  ]
})
export class AuthModule { }
