import { AngularFireModule } from "angularfire2";
import { CommonModule } from '@angular/common';
import { environment } from "../../../../environments/environment";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { ThoughtsFormComponent } from './thoughts-form.component';


@NgModule({
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ThoughtsFormComponent,
  ],
  exports: [
    ThoughtsFormComponent,
  ]
})
export class ThoughtsFormModule { }
