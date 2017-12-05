import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-booking/flight-search/flight-search.component';
import { FlightService } from './flight-booking/flight-search/flight.service';
import { CityPipe } from './shared/pipes/city.pipe';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { HomeComponent } from './home/home.component';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { FlightBookingComponent } from './flight-booking/flight-booking.component';
import { BasketComponent } from "./basket/basket.component";
import { SharedModule } from "./shared/shared.module";
import { CustomPreloadingStrategy } from "./shared/preload/custom-preloading-strategy.service";
import { OAuthModule } from "angular-oauth2-oidc";
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule } from "@ngx-translate/core";
import { TranslateLoader } from "@ngx-translate/core";

import localeDe from '@angular/common/locales/de';
import localeDeAt from '@angular/common/locales/de-AT';
import localeEs from '@angular/common/locales/es';
import { registerLocaleData } from "@angular/common";

registerLocaleData(localeDe);     // de-DE
registerLocaleData(localeDeAt);   // de-AT
registerLocaleData(localeEs);     // es-ES


export function createLoader(http: HttpClient) {
  return new TranslateHttpLoader (http, './assets/i18n/', '.json');
}

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    SharedModule.forRoot(),
    // FlightBookingModule,
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: CustomPreloadingStrategy
    }),
    TranslateModule.forRoot({
      loader: {
             provide: TranslateLoader,
             useFactory: createLoader,
             deps: [HttpClient]
         }
     })  

  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    BasketComponent
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'de-AT' }
    // { provide: FlightService, useClass: FlightService}
    // FlightService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }




