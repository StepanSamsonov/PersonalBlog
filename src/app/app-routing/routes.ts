import { Routes } from '@angular/router';

import {HomeComponent} from "../parts/home/home.component";
import {MatterPostComponent} from "../parts/matters/matter-post/matter-post.component";
import {ThinkingsPostComponent} from "../parts/thinkings/thinkings-post/thinkings-post.component";
import {ImportantComponent} from "../parts/important/important.component";

import {LoginComponent} from "../auth/login/login.component";
import {AuthGuard} from "../auth/services/auth-guard.service";


export const routes: Routes = [
  {path: 'home', canActivate: [AuthGuard], component: HomeComponent},
  {path: 'matters', canActivate: [AuthGuard], component: MatterPostComponent},
  {path: 'blog', component: ThinkingsPostComponent},
  {path: 'important', canActivate: [AuthGuard], component: ImportantComponent},
  {path: 'login', component: LoginComponent},
  {path: '', redirectTo: '/blog', pathMatch: 'full'}
];
