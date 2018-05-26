import { AngularFireDatabase } from "angularfire2/database";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { VisitsComponent } from "./visits.component"
import {VisitService} from "./visits.service";


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    VisitsComponent,
  ],
  providers: [
    AngularFireDatabase,
    VisitsComponent,
    VisitService,
  ]
})
export class VisitsModule { }
