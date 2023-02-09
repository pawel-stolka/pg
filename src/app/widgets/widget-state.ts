import { Injectable } from '@angular/core';

export interface WeatherData {
  temperature: number;
  windSpeed: number;
  skyCondition: string;
}

@Injectable({
  providedIn: 'root'
})
export class WidgetState {

  data: WeatherData = {
    temperature: 20,
    windSpeed: 5,
    skyCondition: 'sunny'
  }

  lastUpdatedAt = new Date();
}
