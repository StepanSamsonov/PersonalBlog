import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AngularFireDatabase } from "angularfire2/database";

import { ThoughtsFormModule } from "../thoughts-form/thoughts-form.module";
import { ThoughtsListService } from "./thoughts-post.service";
import { ThoughtsPostComponent } from "./thoughts-post.component"


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ThoughtsFormModule,
  ],
  declarations: [
    ThoughtsPostComponent,
  ],
  providers: [
    AngularFireDatabase,
    ThoughtsListService,
  ],
})
export class ThoughtsPostModule { }
