import {
  Component,
  inject,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
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

  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  @ViewChild('defaultWidgetHeader') headerTemplate!: TemplateRef<any>;

  ngAfterViewInit() {
    this.container.createEmbeddedView(this.headerTemplate);
  }
}
