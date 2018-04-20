import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {environment} from "../../../../environments/environment";
import {AngularFireModule} from "angularfire2";
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MatterPostComponent } from './matter-post.component';
import {AngularFireDatabase} from "angularfire2/database";
import {MatterListService} from "./matter-post.service";
import {MatterFormModule} from "../matter-form/matter-form.module";
import {SortPipe} from "./sort.pipe";
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    MatterFormModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [MatterPostComponent, SortPipe],
  exports: [MatterPostComponent],
  providers: [AngularFireDatabase, MatterListService],
})
export class MatterPostModule { }
