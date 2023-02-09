import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './widgets/weather-widget/weather-widget.component';
import { WeatherCustomActionsComponent } from './widgets/weather-custom-actions/weather-custom-actions.component';
import { WidgetActions } from './widgets/widget-actions';
import { WidgetState } from './widgets/widget-state';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, WeatherWidgetComponent, WeatherCustomActionsComponent],
  imports: [CommonModule, BrowserModule],
  providers: [WidgetState, WidgetActions],
  bootstrap: [AppComponent],
})
export class AppModule {}
