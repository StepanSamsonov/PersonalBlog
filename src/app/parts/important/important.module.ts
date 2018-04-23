import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImportantComponent } from './important.component';
import {AngularFireDatabase} from "angularfire2/database";
import {ImportantService} from './important.service';
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ImportantComponent],
  providers: [AngularFireDatabase, ImportantService],
})
export class ImportantModule { }
