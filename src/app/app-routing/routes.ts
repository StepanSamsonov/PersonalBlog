import { Routes } from '@angular/router';

import {HomeComponent} from "../parts/home/home.component";
import {MatterPostComponent} from "../parts/matters/matter-post/matter-post.component";
import {ThinkingsPostComponent} from "../parts/thinkings/thinkings-post/thinkings-post.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'matters', component: MatterPostComponent},
  {path: 'blog', component: ThinkingsPostComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'}
];
