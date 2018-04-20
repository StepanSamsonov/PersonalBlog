import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { ReactiveFormsModule } from '@angular/forms';
import {environment} from "../../../../environments/environment";
import {AngularFireModule} from "angularfire2";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  declarations: [FormComponent],
  exports: [FormComponent]
})
export class MatterFormModule { }
