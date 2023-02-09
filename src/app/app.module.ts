import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { WidgetActions } from './widget-actions';
import { WidgetState } from './widget-state';

@NgModule({
  declarations: [AppComponent, WeatherWidgetComponent],
  imports: [BrowserModule],
  providers: [WidgetState, WidgetActions],
  bootstrap: [AppComponent],
})
export class AppModule {}
