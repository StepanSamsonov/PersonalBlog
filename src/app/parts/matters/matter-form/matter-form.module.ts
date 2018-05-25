import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { FormComponent } from './matter-form.component';
import { MatterFormService } from "./matter-form.service";


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    FormComponent,
  ],
  exports: [
    FormComponent,
  ],
  providers: [
    MatterFormService,
  ]
})
export class MatterFormModule { }
