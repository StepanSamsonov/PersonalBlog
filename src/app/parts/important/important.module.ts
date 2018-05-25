import { AngularFireDatabase } from "angularfire2/database";
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { ImportantComponent } from './important.component';
import { ImportantService } from './important.service';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ImportantComponent,
  ],
  providers: [
    AngularFireDatabase,
    ImportantService,
  ],
})
export class ImportantModule { }
