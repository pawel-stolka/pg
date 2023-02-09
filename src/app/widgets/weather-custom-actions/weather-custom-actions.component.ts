import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { WeatherWidgetComponent } from '../weather-widget/weather-widget.component';

@Component({
  selector: 'weather-custom-actions',
  // imports:[CommonModule],
  templateUrl: './weather-custom-actions.component.html',
  styleUrls: ['./weather-custom-actions.component.scss'],
})
export class WeatherCustomActionsComponent {
  weatherWidget = inject(WeatherWidgetComponent);

  onClick() {
    console.log('onClick');
    this.weatherWidget.actions.reload();
    this.weatherWidget.actions.copyData();
  }
}
