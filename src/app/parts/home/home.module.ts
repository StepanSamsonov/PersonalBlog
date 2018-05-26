import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./home.component";
import {MainService} from "./home.service";


@NgModule({
  imports: [
    ChartsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
  ],
  providers: [
    MainService,
  ]
})
export class HomeModule { }
