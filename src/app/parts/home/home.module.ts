import { AngularFireModule } from "angularfire2";
import { ChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { environment } from "../../../environments/environment";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { HomeComponent } from "./home.component";


@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    ChartsModule,
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [
    HomeComponent,
  ],
})
export class HomeModule { }
