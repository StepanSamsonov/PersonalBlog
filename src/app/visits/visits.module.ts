import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AngularFireModule} from "angularfire2";
import {environment} from "../../environments/environment";
import {VisitsComponent} from "./visits.component"
import {AngularFireDatabase} from "angularfire2/database";


@NgModule({
  imports: [
    CommonModule,
    AngularFireModule.initializeApp(environment.firebase),
  ],
  declarations: [VisitsComponent],
  exports: [VisitsComponent],
  providers: [AngularFireDatabase, VisitsComponent]
})
export class VisitsModule { }
