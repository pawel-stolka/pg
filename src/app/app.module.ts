import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { WidgetActions } from './widget-actions';
import { WidgetState } from './widget-state';
import { HomeComponent } from './features/home/home.component';
import { ProductDetailsComponent } from './features/details/details.component';
import { NavComponent } from './features/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ProductsComponent } from './features/products/products.component';
import { WeatherWidgetComponent } from './features/weather-widget/weather-widget.component';
import { CategoriesComponent } from './features/products/categories/categories.component';
import { BenefitsComponent } from './features/products/benefits/benefits.component';
import { CategoryDetailComponent } from './features/products/categories/category-detail/category-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoryDurationsComponent } from './features/products/categories/category-durations/category-durations.component';
import { CategoryPaymentsComponent } from './features/products/categories/category-payments/category-payments.component';
import { StateComponent } from './common/state/state.component';

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
    CategoriesComponent,
    BenefitsComponent,
    CategoryDetailComponent,
    CategoryDurationsComponent,
    CategoryPaymentsComponent,
    StateComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  providers: [WidgetState, WidgetActions],
  bootstrap: [AppComponent],
})
export class AppModule {}
