import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatterPostComponent } from './matter-post.component';
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireDatabase } from "angularfire2/database";

import { MatterFormModule } from "../matter-form/matter-form.module";
import { MatterListService } from "./matter-post.service";
import { SortPipe } from "./sort.pipe";


@NgModule({
  imports: [
    CommonModule,
    MatterFormModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MatterPostComponent,
    SortPipe,
  ],
  providers: [
    AngularFireDatabase,
    MatterListService,
  ],
})
export class MatterPostModule { }
