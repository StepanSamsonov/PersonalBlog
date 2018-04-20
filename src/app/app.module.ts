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
//import { HomeComponent } from './parts/home/home.component';
import {HomeModule} from "./parts/home/home.module";
import { ThinkingsPostComponent } from './parts/thinkings/thinkings-post/thinkings-post.component';
import {ThinkingsPostModule} from "./parts/thinkings/thinkings-post/thinkings-post.module";

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
    ThinkingsPostModule
  ],
  providers: [
    {provide: LOCALE_ID, useValue: 'ru'},
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule { }
