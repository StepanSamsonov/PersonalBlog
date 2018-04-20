import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ThinkingsFormModule} from "../thinkings-form/thinkings-form.module";
import {AngularFireDatabase} from "angularfire2/database";
import {ThinkingsPostComponent} from "./thinkings-post.component"
import {ThinkingsListService} from "./thinkings-post.service";
import {ReactiveFormsModule} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {AngularFireModule} from "angularfire2";

@NgModule({
  imports: [
    CommonModule,
    ThinkingsFormModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [ThinkingsPostComponent],
  exports: [ThinkingsPostComponent],
  providers: [AngularFireDatabase, ThinkingsListService],
})
export class ThinkingsPostModule { }
