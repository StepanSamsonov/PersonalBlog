import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { ThoughtsFormComponent } from './thoughts-form.component';
import { ThoughtsFormService } from "./thoughts-form.service";



@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  declarations: [
    ThoughtsFormComponent,
  ],
  exports: [
    ThoughtsFormComponent,
  ],
  providers: [
    ThoughtsFormService,
  ],
})
export class ThoughtsFormModule { }
