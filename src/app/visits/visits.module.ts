import { AngularFireDatabase } from "angularfire2/database";
import { AngularFireModule } from "angularfire2";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { environment } from "../../environments/environment";

import { VisitsComponent } from "./visits.component"


@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
  ],
  declarations: [
    VisitsComponent,
  ],
  exports: [
    VisitsComponent,
  ],
  providers: [
    AngularFireDatabase,
    VisitsComponent,
  ]
})
export class VisitsModule { }
