import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { environment } from '../environments/environment';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { AppRoutingModule } from './app-routing/app-routing-module';
import { AuthModule } from "./auth/auth.module";
import { FormsModule } from "@angular/forms";
import { HomeModule } from "./parts/home/home.module";
import { ImportantModule } from './parts/important/important.module';
import { MatterPostModule } from './parts/matters/matter-post/matter-post.module';
import { MatterFormModule } from './parts/matters/matter-form/matter-form.module';
import { NotificationsModule } from "./notifications/notifications.module";
import { ThoughtsPostModule } from "./parts/thoughts/thoughts-post/thoughts-post.module";
import { VisitsModule} from "./visits/visits.module";


registerLocaleData(localeRu);


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    AppRoutingModule,
    AuthModule,
    BrowserModule,
    ImportantModule,
    FormsModule,
    HomeModule,
    HttpClientModule,
    MatterFormModule,
    MatterPostModule,
    NotificationsModule,
    ThoughtsPostModule,
    VisitsModule,
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
