import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { NotificationsService } from "./notifications.service";


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    NotificationsComponent,
  ],
  exports: [
    NotificationsComponent,
  ],
  providers: [
    NotificationsService,
  ]
})
export class NotificationsModule { }
