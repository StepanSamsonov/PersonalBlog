import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThinkingsFormComponent } from './thoughts-form.component';
import {environment} from "../../../../environments/environment";
import {AngularFireModule} from "angularfire2";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [ThinkingsFormComponent],
  exports: [ThinkingsFormComponent]
})
export class ThinkingsFormModule { }
