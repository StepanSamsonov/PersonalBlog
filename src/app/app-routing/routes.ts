import { Routes } from '@angular/router';

import { AuthGuard } from "../auth/services/auth-guard.service";

import { HomeComponent } from "../parts/home/home.component";
import { ImportantComponent } from "../parts/important/important.component";
import { LoginComponent } from "../auth/login/login.component";
import { MatterPostComponent } from "../parts/matters/matter-post/matter-post.component";
import { ThoughtsPostComponent } from "../parts/thoughts/thoughts-post/thoughts-post.component";


export const routes: Routes = [
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'matters', canActivate: [AuthGuard], component: MatterPostComponent},
  {path: 'blog', component: ThoughtsPostComponent},
  {path: 'important', canActivate: [AuthGuard], component: ImportantComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/blog', pathMatch: 'full'}
];
