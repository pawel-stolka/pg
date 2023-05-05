import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router'

import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { WidgetActions } from './widget-actions';
import { WidgetState } from './widget-state';

const routes: Routes = []

@NgModule({
  declarations: [AppComponent, WeatherWidgetComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [WidgetState, WidgetActions],
  bootstrap: [AppComponent],
})
export class AppModule {}
