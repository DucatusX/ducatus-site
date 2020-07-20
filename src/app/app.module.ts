import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FormsModule, ReactiveFormsModule, NgForm } from '@angular/forms';
import { environment } from '../environments/environment';

// plugins
import { QRCodeModule } from 'angularx-qrcode';
import { Ng2TelInputModule } from 'ng2-tel-input';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClientModule, HttpClient, HttpClientXsrfModule } from '@angular/common/http';
import { ClipboardModule } from '@angular/cdk/clipboard';

// resolvers
import { UserResolver } from './resolvers';

// pages
import { AppComponent } from './app.component';
import { IndexComponent } from './pages/index/index.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BuyComponent } from './pages/buy/buy.component';
import { LegalComponent } from './pages/legal/legal.component';
import { GoldLotteryComponent } from './pages/gold-lottery/gold-lottery.component';
import { LegalDisclaimerComponent } from './pages/legal-disclaimer/legal-disclaimer.component';
import { ErrorPageComponent } from './pages/errorpage/errorpage.component';
import { DucatusxComponent } from './pages/ducatusx/ducatusx/ducatusx.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { LoginComponent } from './pages/login/login.component';
import { TicketsComponent } from './pages/buy/tikcets/tickets.component';

// partials
import { HeaderComponent } from './pages/index/header/header.component';
import { FooterComponent } from './pages/index/footer/footer.component';

// components
import { CountdownComponent } from './components/countdown/countdown.component';

// pipes
import { SafePipe } from './pipe/safeUrl.pipe';
import { GoogleAnalyticsService } from './service/gtag/google-analytics.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [

    // pages
    AppComponent,
    IndexComponent,
    AboutComponent,
    ContactComponent,
    BuyComponent,
    LegalComponent,
    LegalDisclaimerComponent,
    GoldLotteryComponent,
    ErrorPageComponent,
    DucatusxComponent,
    VoucherComponent,
    LoginComponent,
    TicketsComponent,

    // components
    HeaderComponent,
    FooterComponent,

    // pipes
    SafePipe,
    CountdownComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QRCodeModule,
    FormsModule,
    Ng2TelInputModule,
    ReactiveFormsModule,
    ClipboardModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
    }),
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'csrftoken',
      headerName: 'X-CSRFToken'
    }),
  ],
  providers: [
    UserResolver,
    GoogleAnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
