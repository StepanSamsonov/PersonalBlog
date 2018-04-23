import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppComponent } from './app.component';
import {environment} from '../environments/environment';
import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {registerLocaleData} from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import {HttpClientModule} from '@angular/common/http';

import { MatterPostModule } from './parts/matters/matter-post/matter-post.module';
import { MatterFormModule } from './parts/matters/matter-form/matter-form.module';
import { AppRoutingModule} from './app-routing/app-routing-module';
import {HomeModule} from "./parts/home/home.module";
import {ThinkingsPostModule} from "./parts/thinkings/thinkings-post/thinkings-post.module";
import {NotificationsModule} from "./notifications/notifications.module";
import {ImportantModule} from './parts/important/important.module';
import {AuthService} from "./auth/auth.service";
import { LoginComponent } from './auth/login/login.component';
import {LoginModule} from "./auth/login/login.module";

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    MatterPostModule,
    HttpClientModule,
    MatterFormModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AppRoutingModule,
    HomeModule,
    ThinkingsPostModule,
    ImportantModule,
    NotificationsModule,
    LoginModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
