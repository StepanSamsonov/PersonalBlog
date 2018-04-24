import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HomeComponent} from "./home.component";
import {ReactiveFormsModule} from "@angular/forms";
import {AngularFireModule} from "angularfire2";
import {environment} from "../../../environments/environment";
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    ChartsModule,
  ],
  declarations: [
    HomeComponent,
  ],
  exports: [HomeComponent],
})
export class HomeModule { }
