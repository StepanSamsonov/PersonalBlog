import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThoughtsFormModule} from "../thoughts-form/thoughts-form.module";
import {AngularFireDatabase} from "angularfire2/database";
import {ThoughtsPostComponent} from "./thinkings-post.component"
import {ThoughtsListService} from "./thinkings-post.service";
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {AngularFireModule} from "angularfire2";

@NgModule({
  imports: [
    CommonModule,
    ThoughtsFormModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [ThoughtsPostComponent],
  exports: [ThoughtsPostComponent],
  providers: [AngularFireDatabase, ThoughtsListService],
})
export class ThoughtsPostModule { }
