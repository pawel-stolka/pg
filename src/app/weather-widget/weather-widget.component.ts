import { Component, inject, Input, TemplateRef } from '@angular/core';
import { WidgetActions } from '../widget-actions';
import { WidgetState } from '../widget-state';

@Component({
  selector: 'weather-widget',
  templateUrl: './weather-widget.component.html',
  styleUrls: ['./weather-widget.component.scss'],
})
export class WeatherWidgetComponent {
  state = inject(WidgetState);
  actions = inject(WidgetActions);

  @Input() headerTemplate!: TemplateRef<any>;
  @Input() contentTemplate!: TemplateRef<WidgetState>;
}
