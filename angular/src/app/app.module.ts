import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {WeatherComponent} from "./weather/weather.component";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    WeatherComponent
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}


