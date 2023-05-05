import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WeatherWidgetComponent } from './weather-widget/weather-widget.component';
import { WidgetActions } from './widget-actions';
import { WidgetState } from './widget-state';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ProductDetailsComponent } from './details/details.component';
import { NavComponent } from './nav/nav.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'details', component: ProductDetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    WeatherWidgetComponent,
    HomeComponent,
    ProductsComponent,
    ProductDetailsComponent,
    NavComponent,
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [WidgetState, WidgetActions],
  bootstrap: [AppComponent],
})
export class AppModule {}
